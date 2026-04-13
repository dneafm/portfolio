import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

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
  position: [-0.04, -0.06, 0],
  scale: [0.72, 1.28, 0.68],
  colors: {
    top: "#2A73FF",
    bottom: "#8F52FF",
    highlight: "#F8FBFF",
  },
  roughness: 0.04,
  metalness: 0.12,
  transmission: 0.46,
  opacity: 0.5,
  rotationSpeed: {
    x: 0.0011,
    y: 0.0048,
    z: 0.0007,
  },
  floatingAmplitude: 0.14,
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
    [0.0, 1.42, 0.08],
    [0.34, 1.12, 0.28],
    [0.12, 1.02, 0.54],
    [-0.22, 1.0, 0.34],
    [-0.46, 0.88, 0.1],
    [-0.3, 0.94, -0.28],
    [0.02, 1.0, -0.44],
    [0.32, 0.9, -0.16],
    [0.7, 0.52, 0.22],
    [0.34, 0.42, 0.76],
    [-0.1, 0.56, 0.62],
    [-0.62, 0.32, 0.3],
    [-0.8, 0.06, -0.08],
    [-0.3, 0.18, -0.72],
    [0.24, 0.28, -0.82],
    [0.72, 0.08, -0.28],
    [0.58, -0.42, 0.3],
    [0.2, -0.58, 0.58],
    [-0.24, -0.46, 0.5],
    [-0.56, -0.64, 0.16],
    [-0.4, -0.78, -0.28],
    [0.02, -0.92, -0.54],
    [0.3, -0.78, -0.32],
    [0.46, -0.62, -0.04],
    [0.08, -1.24, 0.02],
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

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function applyVerticalGradient(geometry: THREE.BufferGeometry, top: string, bottom: string) {
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
  const start = new THREE.Color(top).convertLinearToSRGB();
  const end = new THREE.Color(bottom).convertLinearToSRGB();

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const t = THREE.MathUtils.clamp((y - minY) / rangeY, 0, 1);
    const ridgeBias = Math.sin((x - z) * 8.6) * 0.08 + Math.cos((x * 1.7 + z) * 6.8) * 0.06;
    const cavity = THREE.MathUtils.clamp(0.78 + ridgeBias - Math.abs(x * 0.18) - Math.abs(z * 0.14), 0.56, 1.08);
    const color = end
      .clone()
      .lerp(start, THREE.MathUtils.clamp(t + ridgeBias * 0.32, 0, 1))
      .multiplyScalar(cavity * 1.08);

    colors[i * 3] = THREE.MathUtils.clamp(color.r, 0, 1);
    colors[i * 3 + 1] = THREE.MathUtils.clamp(color.g, 0, 1);
    colors[i * 3 + 2] = THREE.MathUtils.clamp(color.b, 0, 1);
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function FitCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, -0.02, 9.6);
    camera.lookAt(-0.04, -0.06, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function HeroGem({ config, ghost = false }: { config: HeroGemConfig; ghost?: boolean }) {
  const ref = useRef<Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
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
    const hoverPulse = hovered ? 1 + Math.sin(t * 3.8) * 0.04 : 1;

    ref.current.position.y = config.position[1] + Math.sin(t * 1.02) * config.floatingAmplitude;
    ref.current.rotation.x += config.rotationSpeed.x;
    ref.current.rotation.y += config.rotationSpeed.y + (hovered ? 0.006 : 0);
    ref.current.rotation.z += config.rotationSpeed.z;
    ref.current.scale.lerp(
      new THREE.Vector3(config.scale[0] * hoverPulse, config.scale[1] * hoverPulse, config.scale[2] * hoverPulse),
      0.08,
    );

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, hovered ? 0.4 : 0.22, 0.12);
    }

    if (innerGlowRef.current) {
      const glowScale = hovered ? 0.82 + Math.sin(t * 4.2) * 0.05 : 0.76 + Math.sin(t * 1.6) * 0.02;
      innerGlowRef.current.scale.setScalar(glowScale);
    }

    if (shellRef.current) {
      const shellScale = hovered ? 1.14 : 1.09;
      shellRef.current.scale.lerp(new THREE.Vector3(shellScale, shellScale, shellScale), 0.08);
    }
  });

  if (ghost) {
    return (
      <group
        ref={ref}
        position={[0, 0.24, -4.8]}
        scale={[config.scale[0] * 2.4, config.scale[1] * 2.3, config.scale[2] * 2.3]}
        rotation={[0.16, -0.4, 0.06]}
      >
        <mesh geometry={geometry}>
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.11}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={ref} position={config.position} scale={config.scale} rotation={[-0.18, 0.18, 0.08]}>
      <mesh geometry={geometry} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshPhysicalMaterial
          ref={materialRef}
          vertexColors
          flatShading
          roughness={config.roughness}
          metalness={config.metalness}
          transmission={config.transmission}
          thickness={1.6}
          ior={1.46}
          reflectivity={0.88}
          clearcoat={0.96}
          clearcoatRoughness={0.02}
          transparent
          opacity={config.opacity}
          emissive={new THREE.Color(config.colors.top)}
          emissiveIntensity={0.14}
        />
      </mesh>

      <mesh ref={innerGlowRef} geometry={geometry} scale={0.76}>
        <meshBasicMaterial
          color={config.colors.bottom}
          transparent
          opacity={hovered ? 0.34 : 0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={shellRef} geometry={geometry} scale={1.09}>
        <meshBasicMaterial
          color={config.colors.highlight}
          transparent
          opacity={hovered ? 0.2 : 0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SceneComposition() {
  return (
    <group>
      <HeroGem config={HERO_GEM} ghost />
      <HeroGem config={HERO_GEM} />

      <mesh position={[0, -1.48, -1.8]} scale={[5.4, 3.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8aa9ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function HeroCrystalScene() {
  return (
    <div className="absolute inset-0 z-0 origin-center scale-[0.82] overflow-visible pointer-events-auto saturate-[1.28] md:scale-[0.86] lg:scale-[0.9]">
      <Canvas
        camera={{ position: [0, -0.02, 9.6], fov: 18, near: 0.1, far: 100 }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        style={{ background: "transparent" }}
      >
        <FitCamera />
        <fog attach="fog" args={["#cfd6ff", 18, 34]} />
        <ambientLight intensity={0.46} color="#d2dcff" />
        <directionalLight position={[6, 7, 8]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-6, 3, 6]} intensity={1.7} color="#73a2ff" />
        <directionalLight position={[2, -2, 5]} intensity={1.45} color="#b57dff" />
        <pointLight position={[3.4, 2.2, 4.6]} intensity={7.2} distance={20} color="#ffffff" />
        <pointLight position={[-1.4, 1.2, 4.2]} intensity={5.4} distance={18} color="#5b9dff" />
        <pointLight position={[1.4, -2.2, 3.2]} intensity={4.8} distance={15} color="#8F52FF" />
        <SceneComposition />
      </Canvas>
    </div>
  );
}

export default HeroCrystalScene;
