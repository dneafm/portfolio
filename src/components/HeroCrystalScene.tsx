import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import {
  AdditiveBlending,
  Color,
  CylinderGeometry,
  DoubleSide,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  OctahedronGeometry,
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
  const innerShellRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);
  const beamRef = useRef<Mesh>(null);

  const gemGeometry = useMemo(() => new OctahedronGeometry(1.02, 2), []);
  const innerShellGeometry = useMemo(() => new OctahedronGeometry(0.84, 1), []);
  const coreGeometry = useMemo(() => new OctahedronGeometry(0.62, 1), []);
  const haloGeometry = useMemo(() => new OctahedronGeometry(1.12, 2), []);
  const beamGeometry = useMemo(() => new CylinderGeometry(0.07, 0.24, 3.5, 24, 1, true), []);

  const coreMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#c3dcff"),
        emissive: new Color("#6a68ff"),
        emissiveIntensity: 1.18,
        roughness: 0.08,
        metalness: 0.18,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.01,
      }),
    [],
  );

  const innerShellMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#99c8ff"),
        emissive: new Color("#7b72ff"),
        emissiveIntensity: 0.38,
        roughness: 0.12,
        metalness: 0.08,
        transparent: true,
        opacity: 0.32,
        transmission: 0.45,
        thickness: 0.8,
        ior: 1.18,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
    [],
  );

  const haloMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#8ab7ff"),
        transparent: true,
        opacity: 0.075,
        blending: AdditiveBlending,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  const beamMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#8aa1ff"),
        transparent: true,
        opacity: 0.09,
        blending: AdditiveBlending,
        side: DoubleSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.64 + t * 0.12;
      groupRef.current.rotation.z = 0.58 + Math.sin(t * 0.28) * 0.028;
      groupRef.current.rotation.x = 0.16 + Math.cos(t * 0.22) * 0.02;
      groupRef.current.position.y = -0.12 + Math.sin(t * 0.8) * 0.07;
    }

    if (gemRef.current) {
      gemRef.current.rotation.x = Math.sin(t * 0.24) * 0.06;
      gemRef.current.rotation.z = Math.cos(t * 0.22) * 0.04;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.26;
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }

    if (innerShellRef.current) {
      innerShellRef.current.rotation.y = t * 0.18;
      innerShellRef.current.rotation.z = Math.sin(t * 0.34) * 0.06;
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1.008 + Math.sin(t * 1.1) * 0.012);
    }

    if (beamRef.current) {
      beamRef.current.rotation.y = -t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <group scale={0.8} position={[0, -0.06, 0]}>
        <OrbitBand color="#80b4ff" scale={1.02} rotation={[0.9, 0.26, 0.38]} speed={[0.025, 0.11, 0.05]} opacity={0.24} markerScale={0.036} />
        <OrbitBand color="#af98ff" scale={0.9} rotation={[0.22, 1.02, 1.22]} speed={[-0.03, -0.09, 0.04]} opacity={0.18} markerScale={0.03} />
        <OrbitBand color="#67dbff" scale={1.16} rotation={[1.18, -0.26, 0.1]} speed={[0.02, 0.07, -0.03]} opacity={0.12} markerScale={0.024} />

        <MechanicalGear position={[-2.08, 1.14, -0.82]} scale={0.24} speed={0.28} color="#8caeff" />
        <MechanicalGear position={[2.02, -0.92, -0.76]} scale={0.38} speed={-0.2} color="#b6a6ff" />
        <MechanicalGear position={[1.58, 1.48, -1.2]} scale={0.16} speed={0.34} color="#5fd8ff" />

        <mesh ref={beamRef} geometry={beamGeometry} position={[0.02, -0.08, -0.12]} material={beamMaterial} />
        <mesh ref={coreRef} geometry={coreGeometry} scale={[0.66, 1.86, 0.66]} material={coreMaterial} />
        <mesh ref={innerShellRef} geometry={innerShellGeometry} scale={[0.75, 2, 0.75]} material={innerShellMaterial} />

        <mesh ref={gemRef} geometry={gemGeometry} scale={[0.82, 2.14, 0.82]}>
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            thickness={2.8}
            roughness={0.006}
            chromaticAberration={0.055}
            anisotropy={0.42}
            distortion={0.008}
            distortionScale={0.03}
            temporalDistortion={0.015}
            iridescence={0.38}
            iridescenceIOR={1.2}
            clearcoat={1}
            attenuationColor="#7380ff"
            attenuationDistance={1.9}
            color="#f7f9ff"
          />
        </mesh>

        <mesh ref={haloRef} geometry={haloGeometry} scale={[0.92, 2.24, 0.92]} material={haloMaterial} />

        <mesh position={[1.28, 0.88, 0.64]} scale={0.052}>
          <sphereGeometry args={[1, 14, 14]} />
          <meshBasicMaterial color="#f8fbff" transparent opacity={0.95} />
        </mesh>
        <mesh position={[-0.96, -0.44, 0.42]} scale={0.036}>
          <sphereGeometry args={[1, 14, 14]} />
          <meshBasicMaterial color="#cfd8ff" transparent opacity={0.82} />
        </mesh>
      </group>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-10 origin-center scale-[0.76] saturate-[1.35] md:scale-[0.82] lg:scale-[0.86]">
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[24%] top-[18%] h-24 rounded-full bg-blue-400/12 blur-3xl md:inset-x-[22%] md:h-28"
      />
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="pointer-events-none absolute left-[16%] top-[12%] h-24 w-24 rounded-full bg-violet-400/12 blur-3xl md:h-36 md:w-36"
      />

      <Canvas camera={{ position: [0, -0.08, 8.4], fov: 24 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <fog attach="fog" args={["#060916", 9.5, 16.5]} />
        <ambientLight intensity={0.26} />
        <directionalLight position={[5, 6, 5]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-4, 1, 5]} intensity={1.35} color="#8bb6ff" />
        <pointLight position={[0.4, 2.8, 4]} intensity={1.7} color="#ffffff" />
        <pointLight position={[2.4, -0.3, 2.8]} intensity={1.05} color="#71a4ff" />
        <pointLight position={[-2.2, 1.7, 1.9]} intensity={0.8} color="#dfe7ff" />
        <pointLight position={[0, -1.8, 2.4]} intensity={0.52} color="#8f7dff" />
        <spotLight position={[0, 4.4, 3.1]} angle={0.3} penumbra={1} intensity={2.4} color="#dbe7ff" />

        <Float speed={0.9} rotationIntensity={0.03} floatIntensity={0.18}>
          <PrismGem />
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
