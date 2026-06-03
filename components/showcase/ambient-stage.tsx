"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Points as ThreePoints } from "three";

function seededParticleValue(index: number) {
  const value = Math.sin(index * 9283.317 + 17.23) * 10000;
  return value - Math.floor(value);
}

function ParticleField() {
  const ref = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(360);
    for (let index = 0; index < points.length; index += 3) {
      points[index] = (seededParticleValue(index) - 0.5) * 8;
      points[index + 1] = (seededParticleValue(index + 1) - 0.5) * 4.8;
      points[index + 2] = (seededParticleValue(index + 2) - 0.5) * 3;
    }
    return points;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = pointer.x * 0.035 + clock.elapsedTime * 0.018;
    ref.current.rotation.x = pointer.y * -0.025;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#f5c76b" size={0.018} sizeAttenuation depthWrite={false} opacity={0.46} />
    </Points>
  );
}

export function AmbientStage() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden opacity-70 lg:block" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.35]}>
        <ambientLight intensity={0.7} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
