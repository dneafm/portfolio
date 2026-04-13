import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  Shape,
  ShapeGeometry,
  TorusGeometry,
  Vector2,
} from "three";

function createGearShape(teeth = 12, outerRadius = 1, innerRadius = 0.78, toothDepth = 0.16) {
  const shape = new Shape();
  const steps = teeth * 2;

  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = i % 2 === 0 ? outerRadius + toothDepth : outerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }

  const hole = new Shape();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}

function Gear({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<Mesh>(null);
  const geometry = useMemo(() => new ShapeGeometry(createGearShape(12, 1, 0.62, 0.18)), []);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color(color),
        transparent: true,
        opacity: 0.26,
        side: DoubleSide,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [color],
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return <mesh ref={ref} position={position} scale={scale} geometry={geometry} material={material} />;
}

function OrbitRing({
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
  const orbitGeometry = useMemo(() => new TorusGeometry(2.2, 0.018, 12, 240), []);

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
        <meshBasicMaterial color={color} transparent opacity={opacity} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[2.18, 0, 0]} scale={0.065}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshBasicMaterial color={color} transparent opacity={Math.min(opacity + 0.25, 0.9)} />
      </mesh>
    </group>
  );
}

function GemCluster() {
  const groupRef = useRef<Group>(null);
  const gemRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  const gemGeometry = useMemo(() => new IcosahedronGeometry(1.12, 1), []);
  const coreGeometry = useMemo(() => new IcosahedronGeometry(0.78, 0), []);
  const glowGeometry = useMemo(() => new IcosahedronGeometry(1.34, 2), []);

  const coreMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#9bd2ff"),
        emissive: new Color("#4f7cff"),
        emissiveIntensity: 0.65,
        roughness: 0.16,
        metalness: 0.32,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#7dd3fc"),
        transparent: true,
        opacity: 0.08,
        blending: AdditiveBlending,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const starPoints = useMemo(
    () => [
      new Vector2(0, 0),
      new Vector2(1.6, 0.5),
      new Vector2(-1.35, -0.35),
      new Vector2(0.45, -1.65),
      new Vector2(-0.55, 1.35),
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.28;
      groupRef.current.rotation.z = Math.sin(t * 0.42) * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.95) * 0.12;
      groupRef.current.position.x = Math.sin(t * 0.33) * 0.05;
    }

    if (gemRef.current) {
      gemRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
      gemRef.current.rotation.z = Math.cos(t * 0.3) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.42;
      coreRef.current.rotation.x = Math.cos(t * 0.35) * 0.12;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.02 + Math.sin(t * 1.3) * 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      <OrbitRing color="#93c5fd" scale={1.08} rotation={[0.96, 0.2, 0.34]} speed={[0.04, 0.16, 0.08]} opacity={0.36} />
      <OrbitRing color="#c4b5fd" scale={0.88} rotation={[0.28, 0.92, 1.18]} speed={[-0.05, -0.14, 0.09]} opacity={0.3} />
      <OrbitRing color="#67e8f9" scale={1.28} rotation={[1.26, -0.28, 0.12]} speed={[0.03, 0.11, -0.06]} opacity={0.18} />

      <Gear position={[-2.52, 1.26, -0.62]} scale={0.34} speed={0.65} color="#dbeafe" />
      <Gear position={[2.38, -1.08, -0.4]} scale={0.48} speed={-0.48} color="#c4b5fd" />
      <Gear position={[1.82, 1.72, -1.08]} scale={0.22} speed={0.86} color="#7dd3fc" />

      <mesh ref={coreRef} geometry={coreGeometry} scale={[1.02, 1.36, 1.02]} material={coreMaterial} />

      <mesh ref={gemRef} geometry={gemGeometry} scale={[1.14, 1.72, 1.14]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          thickness={1.65}
          roughness={0.04}
          chromaticAberration={0.045}
          anisotropy={0.15}
          distortion={0.08}
          distortionScale={0.18}
          temporalDistortion={0.12}
          iridescence={0.4}
          iridescenceIOR={1.2}
          clearcoat={1}
          attenuationColor="#7c3aed"
          attenuationDistance={1.2}
          color="#f8fbff"
        />
      </mesh>

      <mesh ref={glowRef} geometry={glowGeometry} scale={[1.18, 1.8, 1.18]} material={glowMaterial} />

      <Sparkles count={36} scale={[5.6, 5.8, 5.6]} size={2.8} speed={0.45} opacity={0.85} color="#dbeafe" />

      {starPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, index % 2 === 0 ? 0.5 : -0.4]} scale={index === 0 ? 0.065 : 0.045}>
          <sphereGeometry args={[1, 14, 14]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#e0f2fe" : "#c4b5fd"} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        animate={{ opacity: [0.24, 0.56, 0.24] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[18%] bottom-[18%] h-24 rounded-full bg-cyan-400/15 blur-3xl md:inset-x-[16%] md:bottom-[16%] md:h-32"
      />
      <motion.div
        animate={{ opacity: [0.12, 0.35, 0.12] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute left-[14%] top-[16%] h-28 w-28 rounded-full bg-violet-400/12 blur-3xl md:h-40 md:w-40"
      />

      <Canvas camera={{ position: [0, 0.1, 6.8], fov: 30 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#020617", 8, 15]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 4]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, 1, 5]} intensity={1.4} color="#93c5fd" />
        <pointLight position={[0, 2.4, 4.2]} intensity={1.9} color="#ffffff" />
        <pointLight position={[0, -2.2, 3]} intensity={1.1} color="#a78bfa" />

        <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.45}>
          <GemCluster />
        </Float>

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.16} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
