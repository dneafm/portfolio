import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Vector3,
} from "three";

type HeroGemConfig = {
  id: string;
  position: [number, number, number];
  scale: [number, number, number];
  colors: {
    apex: string;
    core: string;
    base: string;
    highlight: string;
  };
  roughness: number;
  metalness: number;
  transmission: number;
  ior: number;
  clearcoat: number;
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
  floatingAmplitude: number;
};

const HERO_GEM: HeroGemConfig = {
  id: "gem_top_center_V2",
  position: [0.16, 0.08, 0.1],
  scale: [1, 1.8, 1],
  colors: {
    apex: "#4169E1",
    core: "#6A5ACD",
    base: "#9370DB",
    highlight: "#FFFFFF",
  },
  roughness: 0.05,
  metalness: 0.1,
  transmission: 0.4,
  ior: 1.5,
  clearcoat: 1,
  rotationSpeed: {
    x: 0.0018,
    y: 0.0044,
    z: 0.001,
  },
  floatingAmplitude: 0.2,
};

function blendColors(a: string, b: string, t: number) {
  return new Color(a).lerp(new Color(b), t);
}

function createIrregularAmethystGeometry() {
  const apex: [number, number, number] = [0.02, 1.42, 0.01];
  const bottom: [number, number, number] = [0.04, -1.02, -0.03];
  const upperRing: Array<[number, number, number]> = [
    [0.3, 1.0, 0.16],
    [0.1, 0.98, 0.34],
    [-0.2, 0.92, 0.26],
    [-0.34, 0.82, 0.02],
    [-0.22, 0.86, -0.24],
    [0.06, 0.94, -0.36],
    [0.28, 0.9, -0.18],
    [0.38, 0.8, 0.02],
  ];
  const midRing: Array<[number, number, number]> = [
    [0.52, 0.46, 0.14],
    [0.24, 0.38, 0.48],
    [-0.12, 0.44, 0.42],
    [-0.46, 0.34, 0.14],
    [-0.54, 0.22, -0.12],
    [-0.2, 0.3, -0.5],
    [0.18, 0.34, -0.54],
    [0.46, 0.24, -0.18],
  ];
  const lowerRing: Array<[number, number, number]> = [
    [0.38, -0.18, 0.22],
    [0.16, -0.24, 0.42],
    [-0.18, -0.16, 0.34],
    [-0.42, -0.24, 0.08],
    [-0.34, -0.34, -0.2],
    [-0.06, -0.42, -0.36],
    [0.18, -0.34, -0.28],
    [0.34, -0.28, -0.06],
  ];

  const positions: number[] = [];

  const pushTriangle = (a: [number, number, number], b: [number, number, number], c: [number, number, number]) => {
    positions.push(...a, ...b, ...c);
  };

  const connectRing = (topRing: Array<[number, number, number]>, bottomRing: Array<[number, number, number]>) => {
    for (let i = 0; i < topRing.length; i += 1) {
      const next = (i + 1) % topRing.length;
      pushTriangle(topRing[i], bottomRing[i], bottomRing[next]);
      pushTriangle(topRing[i], bottomRing[next], topRing[next]);
    }
  };

  for (let i = 0; i < upperRing.length; i += 1) {
    const next = (i + 1) % upperRing.length;
    pushTriangle(apex, upperRing[i], upperRing[next]);
  }

  connectRing(upperRing, midRing);
  connectRing(midRing, lowerRing);

  for (let i = 0; i < lowerRing.length; i += 1) {
    const next = (i + 1) % lowerRing.length;
    pushTriangle(lowerRing[i], bottom, lowerRing[next]);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.computeVertexNormals();
  return geometry;
}

function applyAmethystGradient(geometry: BufferGeometry, apex: string, core: string, base: string) {
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const occlusion = new Float32Array(position.count);

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
    const normalizedY = (y - minY) / yRange;
    const ridgeNoise = Math.sin((x - z) * 6.4) * 0.08 + Math.cos((x + z) * 7.2) * 0.04;
    const t = MathUtils.clamp(normalizedY + ridgeNoise, 0, 1);
    const color = t > 0.58 ? blendColors(core, apex, (t - 0.58) / 0.42) : blendColors(base, core, t / 0.58);
    const cavity = MathUtils.clamp(1 - (Math.abs(x) + Math.abs(z)) * 0.95 - Math.abs(y * 0.18 - 0.02), 0.38, 1);

    colors[i * 3] = color.r * cavity;
    colors[i * 3 + 1] = color.g * cavity;
    colors[i * 3 + 2] = color.b * cavity;
    occlusion[i] = cavity;
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("occlusionTint", new BufferAttribute(occlusion, 1));
  return geometry;
}

function PrismDebris({ hovered }: { hovered: boolean }) {
  const ref = useRef<Group>(null);
  const pieces = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + 0.22;
        return {
          position: [Math.cos(angle) * 1.78, Math.sin(i * 1.3) * 0.3, Math.sin(angle) * 1.12] as [number, number, number],
          rotation: [i * 0.42, i * 0.64, i * 0.36] as [number, number, number],
          scale: 0.11 + i * 0.018,
          color: i % 2 === 0 ? "#6A5ACD" : "#4169E1",
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.36) * 0.08;
    const s = hovered ? 1.08 : 1;
    ref.current.scale.lerp(new Vector3(s, s, s), 0.08);
  });

  return (
    <group ref={ref}>
      {pieces.map((piece, i) => (
        <mesh key={i} position={piece.position} rotation={piece.rotation} scale={piece.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={piece.color}
            emissive={piece.color}
            emissiveIntensity={hovered ? 0.58 : 0.34}
            roughness={0.18}
            metalness={0.08}
            clearcoat={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function DeFiHeroGem({ config, ghost = false }: { config: HeroGemConfig; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const ridgeShellRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const base = createIrregularAmethystGeometry();
    return applyAmethystGradient(base, config.colors.apex, config.colors.core, config.colors.base);
  }, [config.colors.apex, config.colors.base, config.colors.core]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const pulse = hovered ? 1 + Math.sin(t * 3.2) * 0.035 : 1;

    ref.current.position.y = config.position[1] + Math.sin(t * 1.15) * config.floatingAmplitude;
    ref.current.rotation.x += config.rotationSpeed.x;
    ref.current.rotation.y += config.rotationSpeed.y;
    ref.current.rotation.z += config.rotationSpeed.z;
    ref.current.scale.lerp(new Vector3(config.scale[0] * pulse, config.scale[1] * pulse, config.scale[2] * pulse), 0.08);

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = MathUtils.lerp(materialRef.current.emissiveIntensity, hovered ? 0.32 : 0.14, 0.12);
    }

    if (innerGlowRef.current) {
      const s = hovered ? 0.78 + Math.sin(t * 3.1) * 0.05 : 0.72 + Math.sin(t * 1.5) * 0.025;
      innerGlowRef.current.scale.setScalar(s);
    }

    if (ridgeShellRef.current) {
      const shellScale = hovered ? 1.14 : 1.1;
      ridgeShellRef.current.scale.lerp(new Vector3(shellScale, shellScale, shellScale), 0.08);
    }
  });

  if (ghost) {
    return (
      <group ref={ref} position={config.position} scale={config.scale} rotation={[0.14, -0.36, 0.1]}>
        <mesh geometry={geometry} scale={1.68}>
          <meshBasicMaterial vertexColors transparent opacity={0.08} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={[-0.18, 0.2, 0.12]}>
      <mesh geometry={geometry} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshPhysicalMaterial
          ref={materialRef}
          vertexColors
          roughness={config.roughness}
          metalness={config.metalness}
          transmission={config.transmission}
          thickness={1.8}
          ior={config.ior}
          reflectivity={0.9}
          clearcoat={config.clearcoat}
          clearcoatRoughness={0.02}
          flatShading
          transparent
          opacity={0.98}
          emissive={new Color(config.colors.core)}
          emissiveIntensity={0.14}
        />
      </mesh>

      <mesh ref={innerGlowRef} geometry={geometry} scale={0.72}>
        <meshBasicMaterial
          color={config.colors.core}
          transparent
          opacity={hovered ? 0.26 : 0.17}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ridgeShellRef} geometry={geometry} scale={1.1}>
        <meshBasicMaterial
          color={config.colors.highlight}
          transparent
          opacity={hovered ? 0.16 : 0.1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <PrismDebris hovered={hovered} />
    </group>
  );
}

function SceneComposition() {
  return (
    <group>
      <DeFiHeroGem config={{ ...HERO_GEM, position: [0.84, 0.1, -2.72] }} ghost />
      <DeFiHeroGem config={HERO_GEM} />

      <mesh position={[0.02, -0.58, -1.9]} scale={[5.4, 6.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#d8d1ff" transparent opacity={0.05} />
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
        <fog attach="fog" args={["#d9dbff", 17, 28]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 7, 6]} intensity={3.7} color="#ffffff" />
        <directionalLight position={[1.8, 6.2, 8]} intensity={2.25} color="#b7c8ff" />
        <directionalLight position={[-5, 1, 6]} intensity={2.2} color="#d5bcff" />
        <pointLight position={[4.1, 2.8, 4.2]} intensity={12.5} distance={18} color="#ffffff" />
        <pointLight position={[-3.5, 1.5, 3.6]} intensity={7.4} distance={16} color="#5e88ff" />
        <pointLight position={[0, -3.1, 2.8]} intensity={5.7} distance={14} color="#9370DB" />

        <Float speed={0.62} rotationIntensity={0.02} floatIntensity={0.08}>
          <SceneComposition />
        </Float>

        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.08} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
