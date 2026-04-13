import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { BufferGeometry, Group, Mesh } from "three";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  IcosahedronGeometry,
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
    middle: string;
    bottom: string;
    fresnel: string;
  };
  roughness: number;
  metalness: number;
  transmission: number;
  thickness: number;
  ior: number;
  reflectivity: number;
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
  floatingAmplitude: number;
  bloomStrength: number;
  chromaticAberration: number;
};

const HERO_GEM: HeroGemConfig = {
  id: "defi_core_gem_01",
  position: [0.2, 0.12, 0.15],
  scale: [1.2, 1.5, 1.2],
  colors: {
    top: "#4A90E2",
    middle: "#7B61FF",
    bottom: "#9D50BB",
    fresnel: "#FFFFFF",
  },
  roughness: 0.1,
  metalness: 0.3,
  transmission: 0.4,
  thickness: 2,
  ior: 1.45,
  reflectivity: 0.9,
  rotationSpeed: {
    x: 0.002,
    y: 0.005,
    z: 0.001,
  },
  floatingAmplitude: 0.2,
  bloomStrength: 1.2,
  chromaticAberration: 0.02,
};

function blendColors(a: string, b: string, t: number) {
  return new Color(a).lerp(new Color(b), t);
}

function applyThreeStopGradient(
  geometry: BufferGeometry,
  top: string,
  middle: string,
  bottom: string,
  chromaticAberration: number,
) {
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
    const normalizedY = (y - minY) / yRange;
    const diagonalBias = Math.sin((x - z) * 4.2) * chromaticAberration;
    const t = MathUtils.clamp(normalizedY + diagonalBias, 0, 1);

    const color =
      t > 0.5
        ? blendColors(middle, top, (t - 0.5) * 2)
        : blendColors(bottom, middle, t * 2);

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  nonIndexed.setAttribute("color", new BufferAttribute(colors, 3));
  return nonIndexed;
}

function createDecentralizedPrismGeometry() {
  const geometry = new IcosahedronGeometry(1, 1).toNonIndexed();
  const position = geometry.attributes.position;
  const vector = new Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vector.set(position.getX(i), position.getY(i), position.getZ(i));

    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    const upperTaper = y > 0 ? 1.16 : 0.92;
    const shoulder = Math.max(0, -y) * 0.12;
    const ridge = Math.sin((x - z) * 5.4) * 0.04;
    const split = x > 0 ? 0.07 : -0.07;

    vector.set(
      x * (0.78 + Math.abs(y) * 0.06) + split + ridge,
      y * upperTaper - shoulder,
      z * 0.82 - x * 0.08 - ridge * 0.7,
    );

    position.setXYZ(i, vector.x, vector.y, vector.z);
  }

  return geometry;
}

function PrismDebris({ hovered }: { hovered: boolean }) {
  const ref = useRef<Group>(null);
  const pieces = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + 0.35;
        return {
          position: [Math.cos(angle) * 1.85, Math.sin(i * 1.4) * 0.34, Math.sin(angle) * 1.2] as [number, number, number],
          rotation: [i * 0.5, i * 0.7, i * 0.4] as [number, number, number],
          scale: 0.12 + i * 0.022,
          color: i % 2 === 0 ? "#7B61FF" : "#4A90E2",
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.22;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    const scale = hovered ? 1.08 : 1;
    ref.current.scale.lerp(new Vector3(scale, scale, scale), 0.08);
  });

  return (
    <group ref={ref}>
      {pieces.map((piece, i) => (
        <mesh key={i} position={piece.position} rotation={piece.rotation} scale={piece.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={piece.color}
            emissive={piece.color}
            emissiveIntensity={hovered ? 0.55 : 0.34}
            roughness={0.2}
            metalness={0.12}
            clearcoat={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function FresnelShell({ geometry, hovered }: { geometry: BufferGeometry; hovered: boolean }) {
  return (
    <mesh geometry={geometry} scale={hovered ? 1.16 : 1.11}>
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={hovered ? 0.14 : 0.09}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function DeFiHeroGem({ config, ghost = false }: { config: HeroGemConfig; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const glowRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(
    () =>
      applyThreeStopGradient(
        createDecentralizedPrismGeometry(),
        config.colors.top,
        config.colors.middle,
        config.colors.bottom,
        config.chromaticAberration,
      ),
    [config.chromaticAberration, config.colors.bottom, config.colors.middle, config.colors.top],
  );

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const pulse = hovered ? 1 + Math.sin(t * 3) * 0.035 : 1;

    ref.current.position.y = config.position[1] + Math.sin(t * 1.2) * config.floatingAmplitude;
    ref.current.rotation.x += config.rotationSpeed.x;
    ref.current.rotation.y += config.rotationSpeed.y;
    ref.current.rotation.z += config.rotationSpeed.z;
    ref.current.scale.lerp(
      new Vector3(
        config.scale[0] * pulse,
        config.scale[1] * pulse,
        config.scale[2] * pulse,
      ),
      0.08,
    );

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        hovered ? 0.42 : 0.2,
        0.12,
      );
    }

    if (glowRef.current) {
      const s = hovered ? 0.78 + Math.sin(t * 3.2) * 0.06 : 0.72 + Math.sin(t * 1.5) * 0.03;
      glowRef.current.scale.setScalar(s);
    }
  });

  if (ghost) {
    return (
      <group ref={ref} position={config.position} scale={config.scale} rotation={[0.12, -0.4, 0.08]}>
        <mesh geometry={geometry} scale={1.7}>
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
    <group ref={ref} position={config.position} scale={config.scale} rotation={[-0.18, 0.24, 0.1]}>
      <mesh
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          ref={materialRef}
          vertexColors
          roughness={config.roughness}
          metalness={config.metalness}
          transmission={config.transmission}
          thickness={config.thickness}
          ior={config.ior}
          reflectivity={config.reflectivity}
          clearcoat={1}
          clearcoatRoughness={0.04}
          flatShading
          transparent
          opacity={0.98}
          emissive={new Color(config.colors.middle)}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={glowRef} geometry={geometry} scale={0.72}>
        <meshBasicMaterial
          color={config.colors.middle}
          transparent
          opacity={hovered ? 0.28 : 0.18}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <FresnelShell geometry={geometry} hovered={hovered} />
      <PrismDebris hovered={hovered} />
    </group>
  );
}

function SceneComposition() {
  return (
    <group>
      <DeFiHeroGem config={{ ...HERO_GEM, position: [0.8, 0.12, -2.75] }} ghost />
      <DeFiHeroGem config={HERO_GEM} />

      <mesh position={[0.05, -0.48, -1.8]} scale={[5.4, 5.8, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#d9d4ff" transparent opacity={0.04} />
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
        <fog attach="fog" args={["#d8dcff", 17, 28]} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[8, 7, 6]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[2, 6, 8]} intensity={2.2} color="#b7c8ff" />
        <directionalLight position={[-5, 1, 6]} intensity={2} color="#cba9ff" />
        <pointLight position={[4, 2.8, 4.2]} intensity={12} distance={18} color="#f3ecff" />
        <pointLight position={[-3.5, 1.5, 3.5]} intensity={8} distance={16} color="#5f97ff" />
        <pointLight position={[0, -3, 2.8]} intensity={5.5} distance={14} color="#9d50bb" />

        <Float speed={0.65} rotationIntensity={0.02} floatIntensity={0.1}>
          <SceneComposition />
        </Float>

        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.08} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
