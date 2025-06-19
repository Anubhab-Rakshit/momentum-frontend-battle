"use client"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect } from "react"

import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { viewport, camera } = useThree()
  const mouse = useRef([0, 0])

  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorPrimary = new THREE.Color("hsl(var(--primary))")
    const colorSecondary = new THREE.Color("hsl(var(--secondary))")

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * viewport.width * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // Depth

      const randomColor = Math.random() > 0.5 ? colorPrimary : colorSecondary
      colors[i * 3 + 0] = randomColor.r
      colors[i * 3 + 1] = randomColor.g
      colors[i * 3 + 2] = randomColor.b

      sizes[i] = Math.random() * 5 + 2
    }
    return { positions, colors, sizes }
  }, [viewport.width, viewport.height])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.01

      // Mouse interaction (subtle)
      const targetX = (mouse.current[0] / viewport.width) * 0.1
      const targetY = (mouse.current[1] / viewport.height) * 0.1
      camera.position.x += (targetX - camera.position.x) * 0.02
      camera.position.y += (-targetY - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)
    }
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = [event.clientX - window.innerWidth / 2, event.clientY - window.innerHeight / 2]
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <Points ref={pointsRef} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015} // Adjust for desired particle size
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export function HeroWebGLBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <InteractiveParticles />
        {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} /> */}
      </Canvas>
    </div>
  )
}
