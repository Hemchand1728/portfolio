import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type Theme = "dark" | "light";

const palette = {
  dark: { gold: "#c9a96e", goldHi: "#f0d9a4", core: "#14100b", dust: "#e8cf98" },
  light: { gold: "#a8823f", goldHi: "#c9a25c", core: "#f6efe2", dust: "#9a7536" },
};

const RINGS = [
  { radius: 1.55, tube: 0.022, tilt: [Math.PI / 2, 0, 0.35], speed: 0.18 },
  { radius: 1.85, tube: 0.016, tilt: [0.4, Math.PI / 3, 0], speed: -0.13 },
  { radius: 2.15, tube: 0.012, tilt: [1.1, -0.6, 0.2], speed: 0.09 },
  { radius: 2.45, tube: 0.008, tilt: [Math.PI / 2.4, 0.9, -0.4], speed: -0.06 },
] as const;

function Armillary({ theme }: { theme: Theme }) {
  const c = palette[theme];
  const root = useRef<THREE.Group>(null!);
  const rings = useRef<(THREE.Group | null)[]>([]);
  const { viewport } = useThree();
  const compact = viewport.width < 7;

  useFrame((state, delta) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    const g = root.current;
    // Follow the pointer gently, and turn and drift up as the page scrolls
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.45 + scroll * 1.4, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.3 + scroll * 0.4, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, (compact ? 1.75 : 0) + scroll * 1.6, 4, delta);
    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * RINGS[i].speed * 2;
    });
  });

  const scale = compact ? 0.52 : 1;
  const x = compact ? 0 : Math.min(viewport.width * 0.22, 2.6);

  return (
    <group ref={root} position={[x, 0, 0]} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        {/* Pearl core */}
        <mesh>
          <sphereGeometry args={[0.9, 96, 96]} />
          <MeshDistortMaterial color={c.core} metalness={0.85} roughness={0.12} distort={0.28} speed={1.6} envMapIntensity={1.4} />
        </mesh>

        {/* Polar axis */}
        <mesh rotation={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.012, 0.012, 6, 12]} />
          <meshStandardMaterial color={c.gold} metalness={1} roughness={0.25} />
        </mesh>

        {RINGS.map((r, i) => (
          <group key={i} rotation={r.tilt as unknown as THREE.Euler}>
            <group ref={(el) => { rings.current[i] = el; }}>
              <mesh>
                <torusGeometry args={[r.radius, r.tube, 24, 240]} />
                <meshStandardMaterial color={i % 2 ? c.goldHi : c.gold} metalness={1} roughness={0.18} />
              </mesh>
              {/* A small orbiting body on alternating rings */}
              {i % 2 === 0 && (
                <mesh position={[r.radius, 0, 0]}>
                  <sphereGeometry args={[0.07 - i * 0.012, 32, 32]} />
                  <meshStandardMaterial color={c.goldHi} metalness={1} roughness={0.1} emissive={c.gold} emissiveIntensity={0.25} />
                </mesh>
              )}
            </group>
          </group>
        ))}

        {/* Graduated band, like an engraved meridian */}
        <group rotation={[Math.PI / 2, 0, 0.35]}>
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const long = i % 6 === 0;
            return (
              <mesh key={i} position={[Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0]} rotation={[0, 0, a]}>
                <boxGeometry args={[long ? 0.12 : 0.06, 0.008, 0.008]} />
                <meshStandardMaterial color={c.gold} metalness={1} roughness={0.3} />
              </mesh>
            );
          })}
        </group>
      </Float>

      <Sparkles count={compact ? 50 : 110} scale={[9, 6, 5]} size={2.2} speed={0.25} opacity={0.7} color={c.dust} />
    </group>
  );
}

export default function HeroScene({ theme, active }: { theme: Theme; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      eventSource={document.getElementById("root")!}
      eventPrefix="client"
    >
      <ambientLight intensity={theme === "dark" ? 0.15 : 0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#fff1d6" />
      <Armillary theme={theme} />
      {/* Studio lighting built from light panels so no HDR file is downloaded */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color="#f2c879" intensity={6} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={3} />
          <Lightformer form="rect" color="#fff0d0" intensity={3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 1, 1]} />
        </group>
      </Environment>
    </Canvas>
  );
}
