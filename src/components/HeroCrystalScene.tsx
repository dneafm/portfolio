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
  TetrahedronGeometry,
  Vector3,
} from "three";

type GemConfig = {
  id: string;
  position: [number, number, number];
  scale: number;
  colors: [string, string];
  debrisColors: [string, string];
  glow: number;
  pulse: number;
  rotation: [number, number, number];
  floatSeed: number;
  geometryDetail: number;
  opacity: number;
  debrisCount: number;
  debrisRadius: number;
  roughness: number;
  metalness: number;
  ior: number;
  transmission: number;
  clearcoat: number;
  specularIntensity: number;
};

const HERO_GEM: GemConfig = {
  id: "gem_top_center_002",
  position: [0.35, 0.12, 0.2],
  scale: 2.2,
  colors: ["#0F52BA", "#9966CC"],
  debrisColors: ["#5f8fff", "#c287ff"],
  glow: 1.5,
  pulse: 0.92,
  rotation: [-0.22, 0.38, 0.14],
  floatSeed: 0.72,
  geometryDetail: 2,
  opacity: 0.98,
  debrisCount: 4,
  debrisRadius: 1.9,
  roughness: 0.05,
  metalness: 0.2,
  ior: 1.55,
  transmission: 0.3,
  clearcoat: 1,
  specularIntensity: 0.8,
};

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

  for (let i = 0; i < position.count; i += 1) {
    const y = position.getY(i);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const yRange = Math.max(0.0001, maxY - minY);

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const vertical = (y - minY) / yRange;
    const diagonal = Math.max(0, Math.min(1, (x - z + 1.65) / 3.3));
    const blend = Math.min(1, Math.max(0, vertical * 0.8 + diagonal * 0.2));
    const c = mixHex(start, end, blend);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  nonIndexed.setAttribute("color", new BufferAttribute(colors, 3));
  nonIndexed.computeVertexNormals();
  return nonIndexed;
}

function createSapphireAmethystGeometry(detail = 2) {
  const base = new IcosahedronGeometry(1, detail).toNonIndexed();
  const position = base.attributes.position;
  const vector = new Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vector.set(position.getX(i), position.getY(i), position.getZ(i));

    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    const upperBias = y > 0 ? 1.24 : 0.94;
    const lowerMass = Math.max(0, -y) * 0.18;
    const lateralShear = z * 0.1;
    const ridgeA = Math.sin((x - z) * 6.8) * 0.045;
    const ridgeB = Math.cos((x + y * 0.7 + z) * 7.6) * 0.032;
    const edgeCrunch = (Math.abs(x) + Math.abs(z)) * 0.035;
    const splitPlane = x > 0 ? 0.09 : -0.06;
    const crownPinch = y > 0.45 ? 0.12 : 0;

    vector.set(
      x * (0.7 + upperBias * 0.08) + lateralShear + splitPlane + Math.sign(x || 1) * (ridgeA + edgeCrunch * 0.34),
      y * upperBias + ridgeB * 0.9 - lowerMass * 0.24 + crownPinch,
      z * 0.82 - x * 0.06 + Math.sign(z || 1) * (ridgeB * 0.75) - edgeCrunch * 0.28,
    );

    const radial = 1 + Math.sin((x * 1.4 + y * 1.9 + z * 1.6) * 5.5) * 0.026 + Math.cos((x - z) * 8.1) * 0.018;
    vector.multiplyScalar(radial);

    if (y < -0.35) {
      vector.x *= 1.08;
      vector.z *= 1.03;
      vector.y *= 1.02;
    }

    position.setXYZ(i, vector.x, vector.y, vector.z);
  }

  base.computeVertexNormals();
  return base;
}

function TetraDebris({
  colors,
  radius,
  count,
  seed,
}: {
  colors: [string, string];
  radius: number;
  count: number;
  seed: number;
}) {
  const ref = useRef<Group>(null);
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = seed + (i / count) * Math.PI * 2;
        const ring = radius * (0.84 + (i % 2) * 0.16);
        return {
          position: [
            Math.cos(angle) * ring,
            Math.sin(seed * 4 + i * 1.35) * radius * 0.18,
            Math.sin(angle) * ring * 0.72,
          ] as [number, number, number],
          rotation: [seed + i * 0.65, seed * 0.8 + i * 0.52, seed * 0.6 + i * 0.41] as [number, number, number],
          scale: 0.12 + i * 0.02,
          color: i % 2 === 0 ? colors[0] : colors[1],
        };
      }),
    [colors, count, radius, seed],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.22 + seed;
    ref.current.rotation.z = Math.sin(t * 0.35 + seed) * 0.14;
  });

  return (
    <group ref={ref}>
      {pieces.map((piece, i) => (
        <mesh key={i} position={piece.position} rotation={piece.rotation} scale={piece.scale}>
          <primitive object={new TetrahedronGeometry(1, 0)} attach="geometry" />
          <meshPhysicalMaterial
            color={piece.color}
            emissive={piece.color}
            emissiveIntensity={0.42}
            roughness={0.18}
            metalness={0.12}
            clearcoat={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroGem({ config, ghost = false }: { config: GemConfig; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);
  const geometry = useMemo(
    () => applyVertexGradient(createSapphireAmethystGeometry(config.geometryDetail), config.colors[0], config.colors[1]),
    [config.colors, config.geometryDetail],
  );
  const glowGeometry = useMemo(
    () => applyVertexGradient(createSapphireAmethystGeometry(config.geometryDetail), config.colors[0], config.colors[1]),
    [config.colors, config.geometryDetail],
  );
  const phongMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        vertexColors: true,
        flatShading: true,
        shininess: 100 * config.specularIntensity,
        specular: new Color("#ffffff"),
        transparent: true,
        opacity: config.opacity,
      }),
    [config.opacity, config.specularIntensity],
  );
  const shellMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        vertexColors: true,
        roughness: config.roughness,
        metalness: config.metalness,
        ior: config.ior,
        transmission: config.transmission,
        thickness: 0.88,
        clearcoat: config.clearcoat,
        clearcoatRoughness: 0.04,
        transparent: true,
        opacity: config.opacity,
        flatShading: true,
        emissive: new Color("#DDA0DD"),
        emissiveIntensity: 0.18,
      }),
    [config.clearcoat, config.ior, config.metalness, config.opacity, config.roughness, config.transmission],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + config.floatSeed;
    ref.current.position.y = config.position[1] + Math.sin(t * config.pulse) * 0.08;
    ref.current.rotation.x = config.rotation[0] + Math.sin(t * 0.45) * 0.06;
    ref.current.rotation.y = config.rotation[1] + t * 0.16;
    ref.current.rotation.z = config.rotation[2] + Math.cos(t * 0.38) * 0.05;

    if (shellRef.current) shellRef.current.rotation.y = -t * 0.12;
    if (innerRef.current) {
      const s = 0.56 + Math.sin(t * 1.2) * 0.03;
      innerRef.current.scale.setScalar(s);
    }
  });

  if (ghost) {
    return (
      <group ref={ref} position={config.position} scale={config.scale * 1.55} rotation={config.rotation}>
        <mesh geometry={geometry}>
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.08}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={config.rotation}>
      <mesh ref={shellRef} geometry={geometry} material={shellMaterial} />

      <mesh geometry={geometry}>
        <primitive object={phongMaterial} attach="material" />
      </mesh>

      <mesh ref={innerRef} geometry={glowGeometry} scale={0.56}>
        <meshBasicMaterial
          color="#DDA0DD"
          transparent
          opacity={0.26}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh geometry={glowGeometry} scale={1.12}>
        <meshBasicMaterial
          color="#DDA0DD"
          transparent
          opacity={0.1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <TetraDebris
        colors={config.debrisColors}
        radius={config.debrisRadius}
        count={config.debrisCount}
        seed={config.floatSeed}
      />
    </group>
  );
}

function SceneComposition() {
  return (
    <group>
      <HeroGem
        config={{
          ...HERO_GEM,
          position: [0.95, 0.02, -2.9],
        }}
        ghost
      />

      <HeroGem config={HERO_GEM} />

      <mesh position={[0.05, -0.25, -1.7]} scale={[5.1, 5.8, 1]}>
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
        camera={{ position: [0, 0, 14], fov: 15 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#d9e6ff", 17, 29]} />
        <ambientLight intensity={0.68} />
        <directionalLight position={[8, 7, 6]} intensity={3.4} color="#ffffff" />
        <directionalLight position={[1.5, 5.5, 8]} intensity={2.3} color="#d8b5ff" />
        <directionalLight position={[-6, 1, 6]} intensity={2.05} color="#78a8ff" />
        <pointLight position={[3.8, 2.6, 4.2]} intensity={13} distance={20} color="#efe4ff" />
        <pointLight position={[-3.8, 1.8, 3.4]} intensity={8} distance={18} color="#4f8cff" />
        <pointLight position={[0, -3, 2.5]} intensity={5.2} distance={14} color="#b57dff" />

        <Float speed={0.72} rotationIntensity={0.03} floatIntensity={0.16}>
          <SceneComposition />
        </Float>

        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
