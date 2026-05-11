"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";

const sunModelPath = "/content/elements/sun.glb";

function SunModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(sunModelPath);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={1.45}>
      <primitive object={scene} />
    </group>
  );
}

export function ThreeSun() {
  return (
    <div className="three-sun" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.3} />
        <pointLight position={[2.2, 2.2, 3]} intensity={3.8} color="#fff4bf" />
        <pointLight position={[-3, -1.5, 2]} intensity={1.4} color="#fb923c" />
        <Suspense fallback={null}>
          <SunModel />
        </Suspense>
      </Canvas>
      <span className="three-sun-fallback" />
    </div>
  );
}

useGLTF.preload(sunModelPath);
