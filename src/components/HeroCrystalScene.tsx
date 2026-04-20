import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Lightformer, PresentationControls } from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

type ShardConfig = {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  speed: number;
  top: string;
  bottom: string;
  glow: string;
  opacity: number;
};

type OrbitConfig = {
  color: string;
  scale: number;
  rotation: [number, number, number];
  speed: [number, number, number];
  opacity: number;
};

type OrbitCardConfig = {
  label: string;
  orbit: 0 | 1;
  angle: number;
  radius: number;
  scale: number;
  accent: string;
  glow: string;
};

const ORBIT_CONFIGS: OrbitConfig[] = [
  {
    color: "#6f96ff",
    scale: 1,
    rotation: [0.94, 0.22, 0.56],
    speed: [0.018, 0.07, 0.04],
    opacity: 0.14,
  },
  {
    color: "#9b78ff",
    scale: 0.88,
    rotation: [0.18, 1.18, 1.28],
    speed: [-0.026, -0.08, 0.03],
    opacity: 0.12,
  },
];

const ORBIT_CARDS: OrbitCardConfig[] = [
  { label: "Crypto", orbit: 0, angle: 0.18, radius: 2.12, scale: 1.08, accent: "#7eb4ff", glow: "#2f63ff" },
  { label: "Systems", orbit: 1, angle: 1.18, radius: 2.18, scale: 1.14, accent: "#e8d3ff", glow: "#8a5cff" },
  { label: "Operator", orbit: 0, angle: 2.36, radius: 2.08, scale: 1.12, accent: "#f8d4ff", glow: "#b25cff" },
  { label: "AI", orbit: 1, angle: 3.5, radius: 2.02, scale: 1.04, accent: "#dce8ff", glow: "#5f93ff" },
  { label: "Design", orbit: 0, angle: 4.54, radius: 2.16, scale: 1.14, accent: "#cfe0ff", glow: "#7b74ff" },
];

const SHARDS: ShardConfig[] = [
  {
    position: [1.58, 1.32, -0.28],
    scale: 0.24,
    rotation: [0.2, -0.5, 0.4],
    speed: -0.18,
    top: "#8a5cff",
    bottom: "#d54cff",
    glow: "#bf63ff",
    opacity: 0.86,
  },
  {
    position: [-1.58, 0.76, 0.18],
    scale: 0.22,
    rotation: [-0.3, 0.2, -0.4],
    speed: 0.16,
    top: "#41a5ff",
    bottom: "#2f63ff",
    glow: "#4ea4ff",
    opacity: 0.84,
  },
  {
    position: [-1.74, -0.94, 0.1],
    scale: 0.2,
    rotation: [0.18, 0.4, 0.26],
    speed: -0.14,
    top: "#3b96ff",
    bottom: "#3f69ff",
    glow: "#54a8ff",
    opacity: 0.82,
  },
  {
    position: [1.3, -1.72, 0.2],
    scale: 0.18,
    rotation: [-0.16, -0.28, -0.22],
    speed: 0.15,
    top: "#9b63ff",
    bottom: "#db64ff",
    glow: "#c66cff",
    opacity: 0.82,
  },
  {
    position: [-1.62, -1.56, -0.12],
    scale: 0.1,
    rotation: [0.22, -0.36, 0.4],
    speed: 0.22,
    top: "#934dff",
    bottom: "#cb58ff",
    glow: "#b25cff",
    opacity: 0.8,
  },
];

let cachedVoronoiDepthTexture: THREE.DataTexture | null = null;
let cachedVoronoiEdgeTexture: THREE.DataTexture | null = null;

function triangulateFace(face: number[]) {
  const triangles: Array<[number, number, number]> = [];

  for (let i = 1; i < face.length - 1; i += 1) {
    triangles.push([face[0], face[i], face[i + 1]]);
  }

  return triangles;
}

function fract(value: number) {
  return value - Math.floor(value);
}

function hash2(x: number, y: number) {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123);
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = THREE.MathUtils.clamp((value - edge0) / Math.max(edge1 - edge0, 0.00001), 0, 1);
  return t * t * (3 - 2 * t);
}

function applyCrystalUvs(geometry: THREE.BufferGeometry) {
  const position = geometry.attributes.position;
  const uvs = new Float32Array(position.count * 2);
  const direction = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    direction.set(position.getX(i), position.getY(i), position.getZ(i)).normalize();

    const u = 0.5 + Math.atan2(direction.z, direction.x) / (Math.PI * 2);
    const v = 0.5 - Math.asin(THREE.MathUtils.clamp(direction.y, -1, 1)) / Math.PI;

    uvs[i * 2] = u;
    uvs[i * 2 + 1] = v;
  }

  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  return geometry;
}

function getVoronoiDepthTexture() {
  if (cachedVoronoiDepthTexture) return cachedVoronoiDepthTexture;

  const size = 256;
  const grid = 5;
  const points: Array<{ x: number; y: number; tone: number }> = [];
  const data = new Uint8Array(size * size * 4);

  for (let gy = 0; gy < grid; gy += 1) {
    for (let gx = 0; gx < grid; gx += 1) {
      const jitterX = 0.18 + hash2(gx + 17.3, gy + 43.1) * 0.64;
      const jitterY = 0.18 + hash2(gx + 91.7, gy + 13.9) * 0.64;
      points.push({
        x: (gx + jitterX) / grid,
        y: (gy + jitterY) / grid,
        tone: hash2(gx + 7.9, gy + 121.3),
      });
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      let nearest = Infinity;
      let second = Infinity;
      let cellTone = 0.5;

      for (const point of points) {
        let dx = Math.abs(u - point.x);
        let dy = Math.abs(v - point.y);

        dx = Math.min(dx, 1 - dx);
        dy = Math.min(dy, 1 - dy);

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nearest) {
          second = nearest;
          nearest = distance;
          cellTone = point.tone;
        } else if (distance < second) {
          second = distance;
        }
      }

      const edgeDistance = second - nearest;
      const groove = 1 - smoothstep(0.025, 0.11, edgeDistance);
      const cellCenterLift = 1 - smoothstep(0.16, 0.42, nearest * grid);
      const grain = Math.sin((u * 31.2 + v * 17.4) * Math.PI) * 0.02;
      const height = THREE.MathUtils.clamp(0.7 + cellTone * 0.18 + cellCenterLift * 0.14 - groove * 0.74 + grain, 0, 1);
      const shade = Math.round(height * 255);
      const offset = (y * size + x) * 4;

      data[offset] = shade;
      data[offset + 1] = shade;
      data[offset + 2] = shade;
      data[offset + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.92, 0.92);
  texture.needsUpdate = true;

  cachedVoronoiDepthTexture = texture;
  return texture;
}

function getVoronoiEdgeTexture() {
  if (cachedVoronoiEdgeTexture) return cachedVoronoiEdgeTexture;

  const size = 256;
  const grid = 5;
  const points: Array<{ x: number; y: number }> = [];
  const data = new Uint8Array(size * size * 4);

  for (let gy = 0; gy < grid; gy += 1) {
    for (let gx = 0; gx < grid; gx += 1) {
      const jitterX = 0.18 + hash2(gx + 17.3, gy + 43.1) * 0.64;
      const jitterY = 0.18 + hash2(gx + 91.7, gy + 13.9) * 0.64;
      points.push({
        x: (gx + jitterX) / grid,
        y: (gy + jitterY) / grid,
      });
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      let nearest = Infinity;
      let second = Infinity;

      for (const point of points) {
        let dx = Math.abs(u - point.x);
        let dy = Math.abs(v - point.y);

        dx = Math.min(dx, 1 - dx);
        dy = Math.min(dy, 1 - dy);

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nearest) {
          second = nearest;
          nearest = distance;
        } else if (distance < second) {
          second = distance;
        }
      }

      const edgeDistance = second - nearest;
      const groove = 1 - smoothstep(0.05, 0.18, edgeDistance);
      const alpha = Math.round(THREE.MathUtils.clamp(groove * 255, 0, 255));
      const offset = (y * size + x) * 4;

      data[offset] = 255;
      data[offset + 1] = 255;
      data[offset + 2] = 255;
      data[offset + 3] = alpha;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.92, 0.92);
  texture.needsUpdate = true;

  cachedVoronoiEdgeTexture = texture;
  return texture;
}

function createCrystalGeometry() {
  const vertices: Array<[number, number, number]> = [
    [0.06, 1.36, 0.04],
    [0.58, 0.96, 0.22],
    [0.22, 0.96, 0.72],
    [-0.28, 0.96, 0.5],
    [-0.66, 0.78, 0.12],
    [-0.5, 0.92, -0.32],
    [-0.08, 0.98, -0.54],
    [0.34, 0.9, -0.16],
    [0.94, 0.34, 0.18],
    [0.54, 0.22, 0.86],
    [-0.16, 0.42, 0.72],
    [-0.88, 0.08, 0.26],
    [-1.02, -0.18, -0.04],
    [-0.48, 0.0, -0.8],
    [0.32, 0.12, -0.9],
    [0.86, -0.08, -0.18],
    [0.72, -0.58, 0.26],
    [0.26, -0.78, 0.62],
    [-0.34, -0.64, 0.56],
    [-0.76, -0.88, 0.18],
    [-0.52, -1.0, -0.34],
    [0.04, -1.18, -0.56],
    [0.42, -1.02, -0.28],
    [0.58, -0.78, 0.0],
    [0.12, -1.42, 0.06],
  ];

  const faces: number[][] = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 5],
    [0, 5, 6],
    [0, 6, 7],
    [0, 7, 1],
    [1, 8, 9, 2],
    [2, 9, 10, 3],
    [3, 10, 11, 4],
    [4, 11, 12, 5],
    [5, 12, 13, 6],
    [6, 13, 14, 7],
    [7, 14, 15, 1],
    [1, 15, 8],
    [8, 16, 17, 9],
    [9, 17, 18, 10],
    [10, 18, 19, 11],
    [11, 19, 20, 12],
    [12, 20, 21, 13],
    [13, 21, 22, 14],
    [14, 22, 23, 15],
    [15, 23, 16, 8],
    [16, 24, 17],
    [17, 24, 18],
    [18, 24, 19],
    [19, 24, 20],
    [20, 24, 21],
    [21, 24, 22],
    [22, 24, 23],
    [23, 24, 16],
  ];

  const positions: number[] = [];

  for (const face of faces) {
    for (const [a, b, c] of triangulateFace(face)) {
      positions.push(...vertices[a], ...vertices[b], ...vertices[c]);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  applyCrystalUvs(geometry);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function tintCrystalGeometry(geometry: THREE.BufferGeometry, top: string, bottom: string) {
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);

  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < position.count; i += 1) {
    const y = position.getY(i);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const rangeY = Math.max(maxY - minY, 0.0001);
  const topColor = new THREE.Color(top).convertLinearToSRGB();
  const bottomColor = new THREE.Color(bottom).convertLinearToSRGB();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const vertical = THREE.MathUtils.clamp((y - minY) / rangeY, 0, 1);
    const facetNoise = Math.sin((x * 4.2 - z * 7.4) * 1.3) * 0.12 + Math.cos((x * 2.1 + z * 6.2) * 1.15) * 0.1;
    const edgeBias = THREE.MathUtils.clamp(1.02 - Math.abs(x) * 0.18 - Math.abs(z) * 0.12, 0.76, 1.12);
    const blended = bottomColor
      .clone()
      .lerp(topColor, THREE.MathUtils.clamp(vertical + facetNoise * 0.45, 0, 1))
      .multiplyScalar(edgeBias);

    colors[i * 3] = THREE.MathUtils.clamp(blended.r, 0, 1);
    colors[i * 3 + 1] = THREE.MathUtils.clamp(blended.g, 0, 1);
    colors[i * 3 + 2] = THREE.MathUtils.clamp(blended.b, 0, 1);
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function OrbitBand({
  color,
  scale,
  rotation,
  speed,
  opacity,
}: {
  color: string;
  scale: number;
  rotation: [number, number, number];
  speed: [number, number, number];
  opacity: number;
}) {
  const ref = useRef<Group>(null);
  const orbitGeometry = useMemo(() => new THREE.TorusGeometry(1.84, 0.01, 4, 64), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = rotation[0] + t * speed[0];
    ref.current.rotation.y = rotation[1] + t * speed[1];
    ref.current.rotation.z = rotation[2] + t * speed[2];
  });

  return (
    <group ref={ref} scale={scale} rotation={rotation}>
      <mesh geometry={orbitGeometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitCard({
  orbitConfig,
  label,
  angle,
  radius,
  scale,
  accent,
  glow,
}: OrbitCardConfig & { orbitConfig: OrbitConfig }) {
  const orbitRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (orbitRef.current) {
      orbitRef.current.rotation.x = orbitConfig.rotation[0] + t * orbitConfig.speed[0];
      orbitRef.current.rotation.y = orbitConfig.rotation[1] + t * orbitConfig.speed[1];
      orbitRef.current.rotation.z = orbitConfig.rotation[2] + t * orbitConfig.speed[2];
    }
  });

  return (
    <group ref={orbitRef} scale={orbitConfig.scale} rotation={orbitConfig.rotation}>
      <group rotation={[0, 0, angle]}>
        <group position={[radius, 0, 0]}>
          <Html center zIndexRange={[18, 0]} style={{ pointerEvents: "none" }}>
            <div
              className="pointer-events-none relative w-[6.6rem] rounded-[1.05rem] border border-white/32 bg-white/80 px-3.5 py-1.5 text-center shadow-[0_10px_35px_rgba(55,90,200,0.2)] backdrop-blur-md dark:border-white/14 dark:bg-slate-950/76"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 0 24px ${glow}22`,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <div className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-700 dark:text-slate-100">{label}</div>
              <div
                className="absolute inset-x-3.5 bottom-1 h-px rounded-full opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function CrystalShard({ config }: { config: ShardConfig }) {
  const ref = useRef<Group>(null);
  const geometry = useMemo(() => tintCrystalGeometry(createCrystalGeometry(), config.top, config.bottom), [config.bottom, config.top]);
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(geometry, 18), [geometry]);
  const voronoiDepthMap = useMemo(() => getVoronoiDepthTexture(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = config.rotation[0] + Math.sin(t * 0.8 + config.position[0]) * 0.08;
    ref.current.rotation.y = config.rotation[1] + t * config.speed;
    ref.current.rotation.z = config.rotation[2] + Math.cos(t * 0.7 + config.position[1]) * 0.06;
    ref.current.position.y = config.position[1] + Math.sin(t * 1.1 + config.position[0] * 0.6) * 0.05;
  });

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={config.rotation}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          vertexColors
          flatShading
          roughness={0.04}
          metalness={0.08}
          transmission={0.12}
          thickness={1.18}
          ior={1.44}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={1.6}
          bumpMap={voronoiDepthMap}
          bumpScale={0.12}
          transparent
          opacity={config.opacity}
          emissive={new THREE.Color(config.glow)}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.05}>
        <meshBasicMaterial
          color={config.glow}
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#dfe8ff" transparent opacity={0.18} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function PrismGem() {
  const groupRef = useRef<Group>(null);
  const gemRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const coreGlowRef = useRef<Mesh>(null);
  const coreBloomRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const highlightARef = useRef<Mesh>(null);
  const highlightBRef = useRef<Mesh>(null);

  const geometry = useMemo(() => tintCrystalGeometry(createCrystalGeometry(), "#56a8ff", "#bf66ff"), []);
  const coreGeometry = useMemo(() => tintCrystalGeometry(createCrystalGeometry(), "#c7e1ff", "#f3a7ff"), []);
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(geometry, 16), [geometry]);
  const voronoiDepthMap = useMemo(() => getVoronoiDepthTexture(), []);
  const voronoiEdgeMap = useMemo(() => getVoronoiEdgeTexture(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.12 + t * 0.1;
      groupRef.current.rotation.z = 0.24 + Math.sin(t * 0.32) * 0.03;
      groupRef.current.rotation.x = -0.08 + Math.cos(t * 0.26) * 0.018;
      groupRef.current.position.y = 0.08 + Math.sin(t * 0.88) * 0.06;
    }

    if (gemRef.current) {
      gemRef.current.rotation.x = Math.sin(t * 0.4) * 0.04;
      gemRef.current.rotation.z = Math.cos(t * 0.25) * 0.03;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.2;
      coreRef.current.rotation.z = Math.sin(t * 0.22) * 0.03;
    }

    if (coreGlowRef.current) {
      coreGlowRef.current.rotation.y = t * 0.16;
      coreGlowRef.current.rotation.x = Math.cos(t * 0.34) * 0.02;
    }

    if (coreBloomRef.current) {
      coreBloomRef.current.rotation.y = -t * 0.12;
      coreBloomRef.current.rotation.z = Math.sin(t * 0.28) * 0.03;
    }

    if (shellRef.current) {
      const scale = 1.045 + Math.sin(t * 1.2) * 0.008;
      shellRef.current.scale.set(scale, scale, scale);
    }

    if (highlightARef.current) {
      highlightARef.current.material.opacity = 0.14 + Math.sin(t * 1.1) * 0.03;
    }

    if (highlightBRef.current) {
      highlightBRef.current.material.opacity = 0.08 + Math.cos(t * 1.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0.14, -0.34, 0]}>
      {ORBIT_CONFIGS.map((config) => (
        <OrbitBand key={`${config.color}-${config.scale}`} {...config} />
      ))}

      {ORBIT_CARDS.map((card) => (
        <OrbitCard key={card.label} {...card} orbitConfig={ORBIT_CONFIGS[card.orbit]} />
      ))}

      {SHARDS.map((config, index) => (
        <CrystalShard key={`${config.position.join("-")}-${index}`} config={config} />
      ))}

      <group scale={[1.34, 0.96, 1.08]}>
        <mesh ref={coreRef} geometry={coreGeometry} position={[0.03, -0.02, 0.24]} rotation={[0.08, 0.24, 0.06]} scale={[0.98, 0.98, 0.82]}>
          <meshPhysicalMaterial
            vertexColors
            flatShading
            roughness={0.1}
            metalness={0}
            transmission={0.03}
            thickness={1.34}
            ior={1.36}
            transparent
            opacity={0.92}
            clearcoat={0.58}
            clearcoatRoughness={0.08}
            reflectivity={1}
            envMapIntensity={1.3}
            emissive={new THREE.Color("#bf92ff")}
            emissiveIntensity={0.16}
            bumpMap={voronoiDepthMap}
            bumpScale={0.08}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={coreGlowRef} geometry={coreGeometry} position={[0.02, -0.02, 0.26]} rotation={[0.14, -0.18, 0.1]} scale={[0.82, 0.82, 0.68]}>
          <meshBasicMaterial
            color="#ffd0ff"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={coreBloomRef} geometry={coreGeometry} position={[0.02, -0.02, 0.32]} rotation={[0.18, -0.12, 0.08]} scale={[0.58, 0.56, 0.48]}>
          <meshBasicMaterial
            color="#fff0ff"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={gemRef} geometry={geometry}>
          <meshPhysicalMaterial
            vertexColors
            flatShading
            roughness={0.045}
            metalness={0.08}
            transmission={0.012}
            thickness={1.28}
            ior={1.48}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.02}
            envMapIntensity={1.9}
            bumpMap={voronoiDepthMap}
            bumpScale={0.22}
            transparent
            opacity={1}
            emissive={new THREE.Color("#374dff")}
            emissiveIntensity={0.12}
          />
        </mesh>

        <mesh geometry={geometry} scale={1.014}>
          <meshBasicMaterial
            color="#d7e7ff"
            transparent
            opacity={0.28}
            alphaMap={voronoiEdgeMap}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0.04, -0.02, 0.78]} rotation={[0.04, -0.16, 0.14]} scale={[0.94, 1.08, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#6a30ff" transparent opacity={0.2} depthWrite={false} depthTest={false} />
        </mesh>

        <mesh position={[-0.08, -0.18, 0.74]} rotation={[-0.08, -0.14, -0.12]} scale={[0.58, 0.68, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#c86cff" transparent opacity={0.16} depthWrite={false} depthTest={false} />
        </mesh>

        <mesh position={[0.18, 0.08, 0.76]} rotation={[0.1, -0.22, 0.2]} scale={[0.46, 0.72, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#4b7dff" transparent opacity={0.14} depthWrite={false} depthTest={false} />
        </mesh>

        <mesh position={[-0.02, 0.02, 0.74]} rotation={[0.12, 0.08, -0.06]} scale={[0.5, 0.84, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#f0c7ff" transparent opacity={0.1} depthWrite={false} depthTest={false} />
        </mesh>

        <mesh position={[0.02, -0.02, 0.88]} rotation={[0.02, -0.1, 0.02]} scale={[0.42, 0.52, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#f4d8ff"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>

        <mesh ref={shellRef} geometry={geometry} scale={1.045}>
          <meshBasicMaterial
            color="#dbe6ff"
            transparent
            opacity={0.008}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial color="#edf4ff" transparent opacity={0.08} depthWrite={false} />
        </lineSegments>

        <mesh ref={highlightARef} position={[0.14, 0.24, 0.72]} rotation={[0.18, -0.46, 0.22]} scale={[0.16, 1.18, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        <mesh ref={highlightBRef} position={[-0.22, -0.08, 0.66]} rotation={[-0.08, -0.24, -0.18]} scale={[0.1, 0.76, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#f7d6ff" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-x-[2%] -top-[2%] -bottom-[12%] z-10 origin-center scale-[0.5] overflow-x-hidden overflow-y-visible saturate-[1.34] md:inset-x-[1%] md:-top-[8%] md:-bottom-[22%] md:scale-[0.48] md:saturate-[1.36] lg:-inset-x-[24%] lg:-top-[16%] lg:-bottom-[44%] lg:scale-[0.56] lg:overflow-visible lg:saturate-[1.42]">
      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[24%] top-[30%] h-28 rounded-full bg-blue-400/12 blur-3xl md:inset-x-[26%] md:h-30"
      />
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="pointer-events-none absolute right-[16%] top-[34%] h-32 w-32 rounded-full bg-violet-400/12 blur-3xl md:right-[18%] md:h-40 md:w-40"
      />

      <Canvas className="h-full w-full" camera={{ position: [0.04, 0.08, 11.8], fov: 19.8 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <fog attach="fog" args={["#070915", 9, 16]} />
        <Environment resolution={128}>
          <Lightformer form="ring" color="#dfe8ff" intensity={1.6} scale={5.2} position={[0, 0, 4.8]} />
          <Lightformer form="rect" color="#5f93ff" intensity={1.1} scale={[5.8, 1.4]} position={[-3.8, 1.4, 2.8]} rotation={[0, 0.5, 0.18]} />
          <Lightformer form="rect" color="#d26dff" intensity={0.9} scale={[4.8, 1.2]} position={[3.6, -0.6, 2.4]} rotation={[0, -0.58, -0.12]} />
          <Lightformer form="ring" color="#8ca9ff" intensity={0.7} scale={3.2} position={[0.3, 2.4, 1.6]} rotation={[-0.3, 0, 0]} />
        </Environment>
        <ambientLight intensity={0.18} color="#bfcaff" />
        <directionalLight position={[4.8, 6.2, 5.8]} intensity={1.5} color="#dfe6ff" />
        <directionalLight position={[-4.2, 2.4, 5.2]} intensity={1.2} color="#6d9bff" />
        <pointLight position={[2.2, 2.8, 4.2]} intensity={0.9} color="#dfe7ff" />
        <pointLight position={[-2.4, 0.8, 3.2]} intensity={0.95} color="#4e8fff" />
        <pointLight position={[1.8, -1.8, 2.6]} intensity={0.72} color="#a45fff" />
        <spotLight position={[0.6, 4.6, 3.8]} angle={0.32} penumbra={1} intensity={1.4} color="#c6d9ff" />

        <Float speed={0.78} rotationIntensity={0.02} floatIntensity={0.1}>
          <PresentationControls
            global={false}
            cursor={true}
            snap={false}
            speed={2}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Infinity, Infinity]}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 2.5, tension: 120, friction: 20 }}
          >
            <PrismGem />
          </PresentationControls>
        </Float>
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
