import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group, LineSegments, Mesh } from "three";
import {
  AdditiveBlending,
  Color,
  EdgesGeometry,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  TorusGeometry,
} from "three";

function CrystalArtifact() {
  const groupRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const edgesRef = useRef<LineSegments>(null);
  const orbitARef = useRef<Mesh>(null);
  const orbitBRef = useRef<Mesh>(null);
  const orbitCRef = useRef<Mesh>(null);

  const geometry = useMemo(() => new IcosahedronGeometry(1.34, 1), []);
  const edgeGeometry = useMemo(() => new EdgesGeometry(geometry, 20), [geometry]);
  const orbitGeometry = useMemo(() => new TorusGeometry(2.15, 0.012, 12, 180), []);

  const innerMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#5aa2ff"),
        emissive: new Color("#2563eb"),
        emissiveIntensity: 0.2,
        roughness: 0.22,
        metalness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.38;
      groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.07;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }

    if (edgesRef.current) {
      edgesRef.current.rotation.y = -t * 0.24;
      edgesRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;
    }

    if (orbitARef.current) orbitARef.current.rotation.z = t * 0.22;
    if (orbitBRef.current) orbitBRef.current.rotation.y = -t * 0.18;
    if (orbitCRef.current) orbitCRef.current.rotation.x = t * 0.26;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={orbitARef} geometry={orbitGeometry} rotation={[Math.PI / 2.8, 0.2, 0.45]}>
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.35} />
      </mesh>
      <mesh ref={orbitBRef} geometry={orbitGeometry} rotation={[0.55, 0.8, Math.PI / 2.3]} scale={[0.86, 0.86, 0.86]}>
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.28} />
      </mesh>
      <mesh ref={orbitCRef} geometry={orbitGeometry} rotation={[1.1, 0.1, 0.15]} scale={[1.12, 1.12, 1.12]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.18} />
      </mesh>

      <mesh ref={shellRef} geometry={geometry} scale={[0.88, 1.45, 0.88]} material={innerMaterial} />

      <mesh geometry={geometry} scale={[1.02, 1.74, 1.02]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          thickness={1.25}
          roughness={0.05}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.05}
          distortionScale={0.12}
          temporalDistortion={0.08}
          iridescence={0.22}
          iridescenceIOR={1.18}
          clearcoat={1}
          attenuationColor="#7c3aed"
          attenuationDistance={1}
          color="#eff6ff"
        />
      </mesh>

      <lineSegments ref={edgesRef} geometry={edgeGeometry} scale={[1.06, 1.78, 1.06]}>
        <lineBasicMaterial color="#dbeafe" transparent opacity={0.48} blending={AdditiveBlending} />
      </lineSegments>

      <mesh position={[1.75, 0.55, 0.35]} scale={0.07}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#dbeafe" />
      </mesh>
      <mesh position={[-1.55, -0.35, 0.5]} scale={0.05}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
      <mesh position={[0.45, -1.82, -0.25]} scale={0.045}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        animate={{ opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[23%] bottom-[22%] h-16 rounded-full bg-blue-500/16 blur-3xl md:inset-x-[20%] md:bottom-[19%] md:h-24"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute left-[24%] top-[22%] h-24 w-24 rounded-full bg-violet-500/10 blur-3xl md:left-[18%] md:top-[18%] md:h-36 md:w-36"
      />

      <Canvas camera={{ position: [0, 0.12, 7.2], fov: 32 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 5, 4]} intensity={2.1} color="#ffffff" />
        <directionalLight position={[-4, 2, 4]} intensity={1.2} color="#93c5fd" />
        <pointLight position={[0, -1.2, 4]} intensity={0.8} color="#a78bfa" />

        <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.55}>
          <CrystalArtifact />
        </Float>

        <ContactShadows position={[0, -2.46, 0]} opacity={0.22} scale={6.8} blur={2.8} far={4.3} resolution={512} color="#93c5fd" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
