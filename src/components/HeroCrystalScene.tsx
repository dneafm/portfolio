import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
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
    top: string;
    bottom: string;
    highlight: string;
  };
  roughness: number;
  metalness: number;
  transmission: number;
  opacity: number;
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
  floatingAmplitude: number;
};

const HERO_GEM: HeroGemConfig = {
  id: "blue_purple_irregular_gem",
  position: [1.2, 0.16, 0.12],
  scale: [1.22, 2.02, 1.14],
  colors: {
    top: "#0F52BA",
    bottom: "#9966CC",
    highlight: "#FFFFFF",
  },
  roughness: 0.05,
  metalness: 0.1,
  transmission: 0.4,
  opacity: 0.4,
  rotationSpeed: {
    x: 0.0012,
    y: 0.0058,
    z: 0.0008,
  },
  floatingAmplitude: 0.18,
};

function triangulateFace(face: number[]) {
  const triangles: Array<[number, number, number]> = [];
  for (let i = 1; i < face.length - 1; i += 1) {
    triangles.push([face[0], face[i], face[i + 1]]);
  }
  return triangles;
}

function createIrregularGemGeometry() {
  const vertices: Array<[number, number, number]> = [
    [0.02, 1.44, 0.06],
    [0.34, 1.06, 0.26],
    [0.12, 1.02, 0.48],
    [-0.22, 0.95, 0.32],
    [-0.4, 0.86, 0.08],
    [-0.28, 0.92, -0.28],
    [0.04, 1.0, -0.42],
    [0.32, 0.9, -0.16],
    [0.66, 0.46, 0.2],
    [0.3, 0.36, 0.7],
    [-0.08, 0.48, 0.6],
    [-0.58, 0.26, 0.26],
    [-0.72, 0.02, -0.08],
    [-0.26, 0.16, -0.66],
    [0.22, 0.26, -0.72],
    [0.68, 0.08, -0.26],
    [0.54, -0.4, 0.28],
    [0.22, -0.54, 0.56],
    [-0.2, -0.42, 0.46],
    [-0.48, -0.58, 0.14],
    [-0.34, -0.72, -0.24],
    [0.0, -0.86, -0.48],
    [0.26, -0.72, -0.3],
    [0.4, -0.58, -0.02],
    [0.1, -1.18, 0.02],
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

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.computeVertexNormals();
  return geometry;
}

function blendColors(a: string, b: string, t: number) {
  return new Color(a).lerp(new Color(b), t);
}

function applyVerticalGradient(geometry: BufferGeometry, top: string, bottom: string) {
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

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const t = MathUtils.clamp((y - minY) / rangeY, 0, 1);
    const ridgeBias = Math.sin((x - z) * 8.6) * 0.08 + Math.cos((x * 1.7 + z) * 6.8) * 0.05;
    const cavity = MathUtils.clamp(0.76 + ridgeBias - Math.abs(x * 0.22) - Math.abs(z * 0.18), 0.54, 1.08);
    const color = blendColors(bottom, top, MathUtils.clamp(t + ridgeBias * 0.35, 0, 1));

    colors[i * 3] = MathUtils.clamp(color.r * cavity, 0, 1);
    colors[i * 3 + 1] = MathUtils.clamp(color.g * cavity, 0, 1);
    colors[i * 3 + 2] = MathUtils.clamp(color.b * cavity, 0, 1);
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  return geometry;
}

function HeroGem({ config, ghost = false }: { config: HeroGemConfig; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const base = createIrregularGemGeometry();
    return applyVerticalGradient(base, config.colors.top, config.colors.bottom);
  }, [config.colors.bottom, config.colors.top]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const hoverPulse = hovered ? 1 + Math.sin(t * 3.8) * 0.035 : 1;

    ref.current.position.y = config.position[1] + Math.sin(t * 1.05) * config.floatingAmplitude;
    ref.current.rotation.x += config.rotationSpeed.x;
    ref.current.rotation.y += config.rotationSpeed.y + (hovered ? 0.006 : 0);
    ref.current.rotation.z += config.rotationSpeed.z;
    ref.current.scale.lerp(
      new Vector3(config.scale[0] * hoverPulse, config.scale[1] * hoverPulse, config.scale[2] * hoverPulse),
      0.08,
    );

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = MathUtils.lerp(materialRef.current.emissiveIntensity, hovered ? 0.28 : 0.12, 0.12);
    }

    if (innerGlowRef.current) {
      const glowScale = hovered ? 0.8 + Math.sin(t * 4) * 0.04 : 0.75 + Math.sin(t * 1.6) * 0.018;
      innerGlowRef.current.scale.setScalar(glowScale);
    }

    if (shellRef.current) {
      const shellScale = hovered ? 1.12 : 1.08;
      shellRef.current.scale.lerp(new Vector3(shellScale, shellScale, shellScale), 0.08);
    }
  });

  if (ghost) {
    return (
      <group ref={ref} position={config.position} scale={[config.scale[0] * 2.4, config.scale[1] * 2.25, config.scale[2] * 2.3]} rotation={[0.12, -0.42, 0.08]}>
        <mesh geometry={geometry}>
          <meshBasicMaterial vertexColors transparent opacity={0.08} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={[-0.18, 0.14, 0.08]}>
      <mesh geometry={geometry} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshPhysicalMaterial
          ref={materialRef}
          vertexColors
          roughness={config.roughness}
          metalness={config.metalness}
          transmission={config.transmission}
          thickness={1.6}
          ior={1.46}
          reflectivity={0.88}
          clearcoat={0.96}
          clearcoatRoughness={0.02}
          flatShading
          transparent
          opacity={config.opacity}
          emissive={new Color(config.colors.top)}
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh ref={innerGlowRef} geometry={geometry} scale={0.75}>
        <meshBasicMaterial
          color={config.colors.bottom}
          transparent
          opacity={hovered ? 0.24 : 0.14}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={shellRef} geometry={geometry} scale={1.08}>
        <meshBasicMaterial
          color={config.colors.highlight}
          transparent
          opacity={hovered ? 0.16 : 0.09}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}

function SceneComposition() {
  return (
    <group>
      <HeroGem config={{ ...HERO_GEM, position: [0.52, 0.08, -4.4], floatingAmplitude: 0.04 }} ghost />
      <HeroGem config={HERO_GEM} />

      <mesh position={[1.6, -1.32, -1.8]} scale={[4.8, 3.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8aa9ff" transparent opacity={0.06} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-[-6%] z-10 overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 14 }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <fog attach="fog" args={["#d7ddff", 16, 30]} />
        <ambientLight intensity={0.52} />
        <directionalLight position={[8, 8, 7]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-5, 4, 6]} intensity={2.6} color="#87a8ff" />
        <directionalLight position={[3, -2, 5]} intensity={2.2} color="#c190ff" />
        <pointLight position={[4.2, 2.4, 4.5]} intensity={10.8} distance={20} color="#ffffff" />
        <pointLight position={[0.8, 1.2, 4.6]} intensity={6.8} distance={18} color="#7aa4ff" />
        <pointLight position={[2, -2.4, 3.2]} intensity={5.6} distance={15} color="#9966CC" />

        <Float speed={0.52} rotationIntensity={0.015} floatIntensity={0.06}>
          <SceneComposition />
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
