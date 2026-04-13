import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { Color, IcosahedronGeometry, MeshPhysicalMaterial } from "three";

function CrystalArtifact() {
  const groupRef = useRef<Group>(null);

  const geometry = useMemo(() => new IcosahedronGeometry(1.28, 0), []);
  const innerMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#4f8dff"),
        emissive: new Color("#1d4ed8"),
        emissiveIntensity: 0.18,
        roughness: 0.18,
        metalness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.45;
    groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} scale={[0.9, 1.5, 0.9]} material={innerMaterial} />
      <mesh geometry={geometry} scale={[1.02, 1.72, 1.02]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={256}
          thickness={1.2}
          roughness={0.08}
          chromaticAberration={0.04}
          anisotropy={0.12}
          distortion={0.08}
          distortionScale={0.18}
          temporalDistortion={0.12}
          iridescence={0.35}
          iridescenceIOR={1.2}
          clearcoat={1}
          attenuationColor="#7c3aed"
          attenuationDistance={0.8}
          color="#dbeafe"
        />
      </mesh>

      <mesh position={[0, -2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0, -2.32, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.6]}>
        <circleGeometry args={[1.55, 64]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-[24%] bottom-[18%] h-20 rounded-full bg-blue-500/20 blur-3xl md:inset-x-[22%] md:bottom-[16%] md:h-28"
      />

      <Canvas camera={{ position: [0, 0.15, 6.8], fov: 34 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#050816", 7, 12]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, 2, 3]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[0, -1, 4]} intensity={1.2} color="#a78bfa" />

        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.7}>
          <CrystalArtifact />
        </Float>

        <RoundedBox args={[4.2, 0.06, 2.6]} radius={0.08} smoothness={4} position={[0, -2.46, -0.15]}>
          <meshStandardMaterial color="#0f172a" metalness={0.35} roughness={0.22} transparent opacity={0.38} />
        </RoundedBox>

        <ContactShadows position={[0, -2.42, 0]} opacity={0.55} scale={7} blur={2.4} far={4.5} resolution={512} color="#60a5fa" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
