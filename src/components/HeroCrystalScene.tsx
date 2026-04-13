import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { BufferGeometry, Group, Mesh } from "three";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  OctahedronGeometry,
  TetrahedronGeometry,
  Vector3,
} from "three";

type GemShape =
  | "solar-shard"
  | "violet-prism"
  | "gold-core"
  | "deep-plum"
  | "amber-kite"
  | "magenta-star"
  | "sapphire-cut"
  | "emerald-spear"
  | "indigo-split"
  | "hero-sun";

type GemConfig = {
  id: string;
  shape: GemShape;
  position: [number, number, number];
  scale: number;
  colors: [string, string];
  debrisColors: [string, string];
  glow?: number;
  pulse?: number;
  rotation?: [number, number, number];
  floatSeed?: number;
  materialType?: "physical" | "phong";
  opacity?: number;
  debrisCount?: number;
  debrisRadius?: number;
  geometryDetail?: number;
};

const GRID_GEMS: GemConfig[] = [
  {
    id: "red-gold",
    shape: "solar-shard",
    position: [-4.6, 1.85, 0.1],
    scale: 0.64,
    colors: ["#ff5a43", "#f8b13d"],
    debrisColors: ["#ff7a4f", "#ffc24d"],
    glow: 0.38,
    pulse: 1.1,
    rotation: [0.3, -0.2, 0.1],
    floatSeed: 0.1,
  },
  {
    id: "purple-blue",
    shape: "violet-prism",
    position: [-2.75, 1.85, -0.2],
    scale: 0.68,
    colors: ["#1662ff", "#8d36ff"],
    debrisColors: ["#2678ff", "#a155ff"],
    glow: 0.48,
    pulse: 1.35,
    rotation: [-0.28, 0.48, -0.12],
    floatSeed: 0.8,
    materialType: "phong",
    opacity: 0.95,
    debrisCount: 11,
    debrisRadius: 0.88,
    geometryDetail: 1,
  },
  {
    id: "gold-yellow",
    shape: "gold-core",
    position: [-0.9, 1.85, 0.15],
    scale: 0.58,
    colors: ["#ffd760", "#f7aa2e"],
    debrisColors: ["#ffe07b", "#ffc143"],
    glow: 0.42,
    pulse: 1.22,
    rotation: [0.18, 0.24, -0.1],
    floatSeed: 1.2,
  },
  {
    id: "deep-purple",
    shape: "deep-plum",
    position: [-4.6, 0, -0.15],
    scale: 0.62,
    colors: ["#5c2fbe", "#220744"],
    debrisColors: ["#6b39d8", "#33115d"],
    glow: 0.22,
    pulse: 1.55,
    rotation: [0.12, -0.38, 0.22],
    floatSeed: 1.75,
  },
  {
    id: "amber-gold",
    shape: "amber-kite",
    position: [-2.75, 0, 0.1],
    scale: 0.6,
    colors: ["#ffcb61", "#cf7b1e"],
    debrisColors: ["#ffd071", "#de9234"],
    glow: 0.36,
    pulse: 1.4,
    rotation: [-0.12, 0.2, 0.1],
    floatSeed: 2.2,
  },
  {
    id: "magenta",
    shape: "magenta-star",
    position: [-0.9, 0, -0.12],
    scale: 0.58,
    colors: ["#ff58dc", "#c12294"],
    debrisColors: ["#ff72e6", "#db3baa"],
    glow: 0.36,
    pulse: 1.7,
    rotation: [0.24, 0.32, -0.28],
    floatSeed: 2.9,
  },
  {
    id: "sapphire",
    shape: "sapphire-cut",
    position: [-4.6, -1.85, 0.12],
    scale: 0.6,
    colors: ["#1e79ff", "#103ea7"],
    debrisColors: ["#3f91ff", "#1d56d0"],
    glow: 0.34,
    pulse: 1.18,
    rotation: [0.08, -0.24, 0.16],
    floatSeed: 3.4,
  },
  {
    id: "emerald",
    shape: "emerald-spear",
    position: [-2.75, -1.85, -0.08],
    scale: 0.72,
    colors: ["#33db84", "#0d8f58"],
    debrisColors: ["#5bf09f", "#17b66c"],
    glow: 0.33,
    pulse: 1.28,
    rotation: [-0.24, 0.16, 0.2],
    floatSeed: 3.95,
  },
  {
    id: "blue-purple",
    shape: "indigo-split",
    position: [-0.9, -1.85, 0.05],
    scale: 0.52,
    colors: ["#4d8dff", "#7a52ff"],
    debrisColors: ["#73a4ff", "#8e67ff"],
    glow: 0.28,
    pulse: 1.5,
    rotation: [0.18, 0.28, -0.22],
    floatSeed: 4.6,
  },
];

function mixHex(a: string, b: string, t: number) {
  const c1 = new Color(a);
  const c2 = new Color(b);
  return c1.lerp(c2, t);
}

function applyVertexGradient(geometry: BufferGeometry, start: string, end: string) {
  const nonIndexed = geometry.toNonIndexed();
  const position = nonIndexed.attributes.position;
  const colors = new Float32Array(position.count * 3);

  let minY = Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let maxX = -Infinity;

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  }

  const yRange = Math.max(0.0001, maxY - minY);
  const xRange = Math.max(0.0001, maxX - minX);

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const blend = Math.min(1, Math.max(0, (y - minY) / yRange * 0.72 + (x - minX) / xRange * 0.28));
    const c = mixHex(start, end, blend);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  nonIndexed.setAttribute("color", new BufferAttribute(colors, 3));
  nonIndexed.computeVertexNormals();
  return nonIndexed;
}

function createGemGeometry(shape: GemShape, detail = 0) {
  const base =
    shape === "magenta-star"
      ? new TetrahedronGeometry(1.05, Math.max(0, detail - 1))
      : shape === "violet-prism" || shape === "deep-plum"
        ? new IcosahedronGeometry(0.95, detail)
        : new OctahedronGeometry(1, detail);

  const geometry = base.toNonIndexed();
  const position = geometry.attributes.position;
  const vector = new Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vector.set(position.getX(i), position.getY(i), position.getZ(i));
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;

    switch (shape) {
      case "solar-shard": {
        vector.set(x * (0.82 + Math.max(0, y) * 0.18), y * 1.18, z * 0.72 + x * 0.08);
        break;
      }
      case "violet-prism": {
        const apexBias = y > 0 ? 1.18 : 0.9;
        const shoulder = Math.max(0, -y) * 0.22;
        const ridge = Math.sin((x - z) * 5.4) * 0.028 + Math.cos((x + y) * 4.8) * 0.024;
        const edgeBias = (Math.abs(x) + Math.abs(z)) * 0.045;
        vector.set(
          x * 0.68 + z * 0.12 + Math.sign(x) * shoulder * 0.08 + Math.sign(x || 1) * ridge,
          y * apexBias + ridge * 0.6,
          z * 0.82 - shoulder * 0.06 - Math.sign(z || 1) * edgeBias * 0.4,
        );
        break;
      }
      case "gold-core": {
        vector.set(x * 0.88, y * 0.96, z * 0.88);
        break;
      }
      case "deep-plum": {
        vector.set(x * 0.74, y * 1.06, z * 0.82 + Math.sign(z) * 0.08);
        break;
      }
      case "amber-kite": {
        vector.set(x * 0.84 + Math.max(0, x) * 0.12, y * 1.06, z * 0.72);
        break;
      }
      case "magenta-star": {
        vector.set(x * 0.9, y * 1.18, z * 0.66 + Math.sign(x) * 0.1);
        break;
      }
      case "sapphire-cut": {
        vector.set(x * 0.84, y * 0.9, z * 1.02);
        break;
      }
      case "emerald-spear": {
        vector.set(x * 0.56, y * 1.44, z * 0.52 + y * 0.08);
        break;
      }
      case "indigo-split": {
        vector.set(x * 0.74 + Math.sign(x) * 0.12, y * 0.92, z * 0.86);
        break;
      }
      case "hero-sun": {
        const flare = Math.max(0, x) * 0.26 + Math.max(0, y) * 0.12;
        const pinch = Math.max(0, -x) * 0.1 + Math.max(0, -z) * 0.06;
        vector.set(
          x * (0.92 + flare - pinch) + z * 0.06,
          y * (1.18 + Math.abs(y) * 0.08) - Math.max(0, -y) * 0.08,
          z * (0.68 + Math.max(0, x) * 0.1) - Math.max(0, -x) * 0.1,
        );
        break;
      }
    }

    const facetJitter = 1 + Math.sin((x + y + z) * 6.2) * 0.018;
    vector.multiplyScalar(facetJitter);
    position.setXYZ(i, vector.x, vector.y, vector.z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function GemDebris({
  colors,
  scale,
  radius,
  seed,
  count = 8,
}: {
  colors: [string, string];
  scale: number;
  radius: number;
  seed: number;
  count?: number;
}) {
  const ref = useRef<Group>(null);
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + seed;
        const spread = radius * (0.76 + ((i * 17) % 7) / 10);
        const y = Math.sin(seed * 3 + i * 1.7) * radius * 0.32;
        return {
          position: [Math.cos(angle) * spread, y, Math.sin(angle) * spread * 0.72] as [number, number, number],
          rotation: [seed + i * 0.4, seed * 0.7 + i * 0.3, seed * 0.5 + i * 0.22] as [number, number, number],
          scalar: scale * (0.44 + (i % 3) * 0.18),
          color: i % 2 === 0 ? colors[0] : colors[1],
        };
      }),
    [colors, count, radius, scale, seed],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3 + seed;
    ref.current.rotation.x = Math.sin(t * 0.5 + seed) * 0.12;
  });

  return (
    <group ref={ref}>
      {pieces.map((piece, i) => (
        <mesh key={i} position={piece.position} rotation={piece.rotation} scale={piece.scalar}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={piece.color}
            emissive={piece.color}
            emissiveIntensity={0.26}
            roughness={0.3}
            metalness={0.08}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function FacetedGem({ config, hero = false, ghost = false }: { config: GemConfig; hero?: boolean; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const geometry = useMemo(
    () => applyVertexGradient(createGemGeometry(config.shape, config.geometryDetail ?? 0), config.colors[0], config.colors[1]),
    [config.colors, config.geometryDetail, config.shape],
  );
  const glowGeometry = useMemo(
    () => applyVertexGradient(createGemGeometry(config.shape, config.geometryDetail ?? 0), config.colors[0], config.colors[1]),
    [config.colors, config.geometryDetail, config.shape],
  );
  const phongMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        vertexColors: true,
        flatShading: true,
        shininess: 100,
        specular: new Color("#ffffff"),
        transparent: true,
        opacity: config.opacity ?? 0.95,
      }),
    [config.opacity],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + (config.floatSeed ?? 0);
    ref.current.position.y = config.position[1] + Math.sin(t * (config.pulse ?? 1.2)) * (hero ? 0.08 : 0.05);
    ref.current.rotation.x = (config.rotation?.[0] ?? 0) + Math.sin(t * 0.5) * 0.08;
    ref.current.rotation.y = (config.rotation?.[1] ?? 0) + t * (hero ? 0.22 : 0.14);
    ref.current.rotation.z = (config.rotation?.[2] ?? 0) + Math.cos(t * 0.42) * 0.06;

    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.12;
    }

    if (coreRef.current) {
      const s = hero ? 0.6 + Math.sin(t * 1.2) * 0.025 : 0.54 + Math.sin(t * 1.4) * 0.018;
      coreRef.current.scale.setScalar(s);
    }
  });

  if (ghost) {
    return (
      <group ref={ref} position={config.position} scale={config.scale} rotation={config.rotation}>
        <mesh geometry={geometry}>
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.08}
            blending={AdditiveBlending}
            depthWrite={false}
            wireframe={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={config.rotation}>
      <mesh ref={shellRef} geometry={geometry}>
        {config.materialType === "phong" ? (
          <primitive object={phongMaterial} attach="material" />
        ) : (
          <meshPhysicalMaterial
            vertexColors
            roughness={hero ? 0.24 : 0.34}
            metalness={hero ? 0.08 : 0.04}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.06}
            transmission={hero ? 0.08 : 0.02}
            thickness={hero ? 0.8 : 0.24}
            ior={1.24}
            flatShading
            emissive={new Color(config.colors[1])}
            emissiveIntensity={config.glow ?? 0.28}
          />
        )}
      </mesh>

      <mesh ref={coreRef} geometry={glowGeometry} scale={hero ? 0.58 : 0.52}>
        <meshBasicMaterial color={config.colors[0]} transparent opacity={hero ? 0.18 : 0.12} blending={AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh geometry={glowGeometry} scale={hero ? 1.15 : 1.08}>
        <meshBasicMaterial
          color={config.colors[0]}
          transparent
          opacity={hero ? 0.08 : 0.05}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <GemDebris
        colors={config.debrisColors}
        scale={hero ? 0.15 : 0.08}
        radius={hero ? 1.4 : (config.debrisRadius ?? 0.76)}
        count={hero ? 11 : (config.debrisCount ?? 7)}
        seed={config.floatSeed ?? 0}
      />
    </group>
  );
}

function SceneComposition() {
  const heroConfig: GemConfig = {
    id: "hero-sun",
    shape: "hero-sun",
    position: [3.65, 0.2, 0.35],
    scale: 1.72,
    colors: ["#ffd44f", "#ff8d1a"],
    debrisColors: ["#ffd45d", "#ff991f"],
    glow: 0.56,
    pulse: 1,
    rotation: [-0.12, 0.3, 0.16],
    floatSeed: 0.7,
  };

  return (
    <group>
      <FacetedGem
        config={{
          ...heroConfig,
          position: [4.15, 0.1, -2.8],
          scale: 2.55,
        }}
        ghost
      />

      <group>
        {GRID_GEMS.map((gem) => (
          <FacetedGem key={gem.id} config={gem} />
        ))}
      </group>

      <FacetedGem config={heroConfig} hero />

      <mesh position={[-2.75, 0, -1.6]} scale={[4.1, 4.9, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#d7e7ff" transparent opacity={0.035} />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-[-12%] z-10 overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 16 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#d5e7ff", 18, 30]} />
        <ambientLight intensity={0.58} />
        <directionalLight position={[8, 7, 6]} intensity={3.2} color="#ffffff" />
        <directionalLight position={[2, 5, 8]} intensity={2.2} color="#ffd79d" />
        <directionalLight position={[-6, 1, 6]} intensity={1.85} color="#8ab4ff" />
        <pointLight position={[4.5, 1.5, 4]} intensity={14} distance={18} color="#ffb347" />
        <pointLight position={[-3.2, 2.5, 3.5]} intensity={7} distance={16} color="#8cb3ff" />
        <pointLight position={[-1.5, -3, 2.5]} intensity={4} distance={14} color="#7e5dff" />

        <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.16}>
          <SceneComposition />
        </Float>

        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.12} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
