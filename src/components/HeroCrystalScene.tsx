import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import {
  AdditiveBlending,
  Color,
  CylinderGeometry,
  DoubleSide,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  RingGeometry,
  Shape,
  ShapeGeometry,
  TorusGeometry,
} from "three";

function createGearShape(teeth = 14, outerRadius = 1, innerRadius = 0.74, toothDepth = 0.14) {
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

function MechanicalGear({
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
  const ref = useRef<Group>(null);
  const gearGeometry = useMemo(() => new ShapeGeometry(createGearShape(14, 1, 0.74, 0.14)), []);
  const innerRing = useMemo(() => new RingGeometry(0.18, 0.34, 48), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={gearGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.22}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={innerRing}>
        <meshBasicMaterial
          color="#dbe7ff"
          transparent
          opacity={0.32}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function OrbitBand({
  color,
  scale,
  rotation,
  speed,
  opacity,
  markerScale,
}: {
  color: string;
  scale: number;
  rotation: [number, number, number];
  speed: [number, number, number];
  opacity: number;
  markerScale: number;
}) {
  const ref = useRef<Group>(null);
  const orbitGeometry = useMemo(() => new TorusGeometry(2.14, 0.01, 10, 260), []);

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
      <mesh position={[2.14, 0, 0]} scale={markerScale}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshBasicMaterial color="#f8fbff" transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

function PrismGem() {
  const groupRef = useRef<Group>(null);
  const gemRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);
  const beamRef = useRef<Mesh>(null);

  const gemGeometry = useMemo(() => new IcosahedronGeometry(1.02, 1), []);
  const coreGeometry = useMemo(() => new IcosahedronGeometry(0.68, 0), []);
  const haloGeometry = useMemo(() => new IcosahedronGeometry(1.15, 2), []);
  const beamGeometry = useMemo(() => new CylinderGeometry(0.14, 0.42, 4.2, 32, 1, true), []);

  const coreMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#accfff"),
        emissive: new Color("#4f78ff"),
        emissiveIntensity: 0.48,
        roughness: 0.08,
        metalness: 0.54,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
      }),
    [],
  );

  const haloMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#8fc7ff"),
        transparent: true,
        opacity: 0.055,
        blending: AdditiveBlending,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const beamMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#6ea8ff"),
        transparent: true,
        opacity: 0.08,
        blending: AdditiveBlending,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.045;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    if (gemRef.current) {
      gemRef.current.rotation.x = Math.sin(t * 0.24) * 0.08;
      gemRef.current.rotation.z = Math.cos(t * 0.22) * 0.05;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.32;
      coreRef.current.rotation.x = Math.sin(t * 0.28) * 0.08;
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1.01 + Math.sin(t * 1.1) * 0.015);
    }

    if (beamRef.current) {
      beamRef.current.rotation.y = -t * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <OrbitBand color="#88b7ff" scale={1.12} rotation={[0.9, 0.26, 0.38]} speed={[0.025, 0.11, 0.05]} opacity={0.24} markerScale={0.04} />
      <OrbitBand color="#c7c6ff" scale={0.92} rotation={[0.22, 1.02, 1.22]} speed={[-0.03, -0.09, 0.04]} opacity={0.2} markerScale={0.034} />
      <OrbitBand color="#83d5ff" scale={1.28} rotation={[1.18, -0.26, 0.1]} speed={[0.02, 0.07, -0.03]} opacity={0.12} markerScale={0.028} />

      <MechanicalGear position={[-2.22, 1.22, -0.82]} scale={0.28} speed={0.28} color="#9ebcff" />
      <MechanicalGear position={[2.18, -0.98, -0.76]} scale={0.42} speed={-0.2} color="#c8c9ff" />
      <MechanicalGear position={[1.7, 1.62, -1.2]} scale={0.18} speed={0.34} color="#8ed7ff" />

      <mesh ref={beamRef} geometry={beamGeometry} position={[0, 0, -0.2]} material={beamMaterial} />
      <mesh ref={coreRef} geometry={coreGeometry} scale={[0.94, 1.54, 0.94]} material={coreMaterial} />

      <mesh ref={gemRef} geometry={gemGeometry} scale={[1.02, 1.96, 1.02]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          thickness={1.95}
          roughness={0.015}
          chromaticAberration={0.025}
          anisotropy={0.24}
          distortion={0.015}
          distortionScale={0.04}
          temporalDistortion={0.02}
          iridescence={0.18}
          iridescenceIOR={1.16}
          clearcoat={1}
          attenuationColor="#8ca7ff"
          attenuationDistance={1.9}
          color="#fbfdff"
        />
      </mesh>

      <mesh ref={haloRef} geometry={haloGeometry} scale={[1.08, 2.06, 1.08]} material={haloMaterial} />

      <mesh position={[1.52, 0.44, 0.52]} scale={0.05}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color="#f8fbff" transparent opacity={0.95} />
      </mesh>
      <mesh position={[-1.36, -0.22, 0.38]} scale={0.032}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color="#cfd8ff" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        animate={{ opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[22%] bottom-[16%] h-24 rounded-full bg-blue-400/10 blur-3xl md:inset-x-[18%] md:h-32"
      />
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="pointer-events-none absolute left-[16%] top-[12%] h-24 w-24 rounded-full bg-violet-300/8 blur-3xl md:h-36 md:w-36"
      />

      <Canvas camera={{ position: [0, 0.08, 6.6], fov: 28 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#02030a"]} />
        <fog attach="fog" args={["#02030a", 7.5, 15]} />
        <ambientLight intensity={0.34} />
        <directionalLight position={[5, 6, 5]} intensity={2.3} color="#ffffff" />
        <directionalLight position={[-4, 1, 5]} intensity={1.2} color="#8bb6ff" />
        <pointLight position={[0, 2.6, 3.8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -2, 2.6]} intensity={0.7} color="#8f7dff" />
        <spotLight position={[0, 4.2, 3.2]} angle={0.34} penumbra={1} intensity={2.2} color="#dbe7ff" />

        <Float speed={0.95} rotationIntensity={0.06} floatIntensity={0.28}>
          <PrismGem />
        </Float>

        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
