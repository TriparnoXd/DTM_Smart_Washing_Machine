'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '@/store/useStore'
import { Box, Sphere, Cylinder, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Robo3D() {
  const { activeFeature } = useStore()
  const roboRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)

  // BMO Colors
  const bodyColor = "#5eead4" // Teal/Mint
  const screenColor = "#d9f99d" // Light green
  const limbColor = "#0f766e" // Dark teal
  const buttonBlue = "#3b82f6"
  const buttonRed = "#ef4444"
  const buttonGreen = "#22c55e"
  const buttonYellow = "#eab308"
  const darkDetail = "#0f172a"

  // Animation
  useFrame((state, delta) => {
    if (!roboRef.current) return
    
    // Base floating motion
    roboRef.current.position.y = -1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.05

    if (activeFeature) {
      // Excited animation when feature is clicked
      roboRef.current.position.x = THREE.MathUtils.lerp(roboRef.current.position.x, 3.5, 0.1)
      roboRef.current.position.z = THREE.MathUtils.lerp(roboRef.current.position.z, 1.5, 0.1)
      
      roboRef.current.rotation.y = THREE.MathUtils.lerp(roboRef.current.rotation.y, Math.sin(state.clock.elapsedTime * 5) * 0.2 - 0.5, 0.1)
      
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 15) * 0.8
        rightArmRef.current.rotation.x = -Math.sin(state.clock.elapsedTime * 15) * 0.8
      }
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.1 - 0.5
        rightLegRef.current.position.y = -Math.sin(state.clock.elapsedTime * 10) * 0.1 - 0.5
      }
    } else {
      // Idle state - Roam around, face user, track pointer, playful spins
      
      // Roaming base position
      const roamX = 3.5 + Math.sin(state.clock.elapsedTime * 0.5) * 1.5
      const roamZ = 1.5 + Math.cos(state.clock.elapsedTime * 0.3) * 1.5
      
      roboRef.current.position.x = THREE.MathUtils.lerp(roboRef.current.position.x, roamX, 0.02)
      roboRef.current.position.z = THREE.MathUtils.lerp(roboRef.current.position.z, roamZ, 0.02)

      // Playful barrel roll occasionally (every 8 seconds)
      const timeSecs = state.clock.elapsedTime % 8
      let extraRot = 0
      if (timeSecs < 1.5) {
        // smooth 360 spin
        extraRot = Math.sin((timeSecs / 1.5) * Math.PI) * Math.PI * 2
      }
      
      // Base rotation 0 faces directly at the user
      const targetRotY = (state.pointer.x * 0.5) + extraRot
      const targetRotX = -state.pointer.y * 0.3
      
      // Smoothly look around, tracking pointer and adding playful spins
      roboRef.current.rotation.y = THREE.MathUtils.lerp(roboRef.current.rotation.y, targetRotY, 0.08)
      roboRef.current.rotation.x = THREE.MathUtils.lerp(roboRef.current.rotation.x, targetRotX, 0.08)
      
      if (leftArmRef.current && rightArmRef.current) {
        // slight arm swing while roaming
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(state.clock.elapsedTime) * 0.2, 0.1)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.sin(state.clock.elapsedTime) * 0.2, 0.1)
      }
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.position.y = THREE.MathUtils.lerp(leftLegRef.current.position.y, -0.6, 0.1)
        rightLegRef.current.position.y = THREE.MathUtils.lerp(rightLegRef.current.position.y, -0.6, 0.1)
      }
    }
  })

  return (
    <group ref={roboRef} position={[3.5, -1.0, 1.5]} scale={0.7}>
      {/* Main Body */}
      <RoundedBox castShadow receiveShadow args={[1.2, 1.8, 0.8]} position={[0, 0.2, 0]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox castShadow receiveShadow args={[0.9, 0.7, 0.1]} position={[0, 0.6, 0.38]} radius={0.05}>
        <meshBasicMaterial color={screenColor} />
      </RoundedBox>

      {/* Face (Eyes and Mouth) */}
      <Sphere castShadow receiveShadow args={[0.04, 16, 16]} position={[-0.2, 0.7, 0.44]}>
        <meshBasicMaterial color={darkDetail} />
      </Sphere>
      <Sphere castShadow receiveShadow args={[0.04, 16, 16]} position={[0.2, 0.7, 0.44]}>
        <meshBasicMaterial color={darkDetail} />
      </Sphere>
      
      {/* Happy Mouth */}
      <group position={[0, 0.55, 0.44]}>
        <Box castShadow receiveShadow args={[0.15, 0.05, 0.01]} position={[0, 0, 0]}>
          <meshBasicMaterial color={darkDetail} />
        </Box>
        <Box castShadow receiveShadow args={[0.05, 0.05, 0.01]} position={[-0.075, 0.025, 0]}>
          <meshBasicMaterial color={darkDetail} />
        </Box>
        <Box castShadow receiveShadow args={[0.05, 0.05, 0.01]} position={[0.075, 0.025, 0]}>
          <meshBasicMaterial color={darkDetail} />
        </Box>
      </group>

      {/* Cartridge Slot */}
      <Box castShadow receiveShadow args={[0.6, 0.05, 0.05]} position={[0, 0.1, 0.4]}>
        <meshStandardMaterial color={darkDetail} />
      </Box>

      {/* Buttons */}
      {/* D-Pad (Yellow Cross) */}
      <Box castShadow receiveShadow args={[0.08, 0.24, 0.05]} position={[-0.3, -0.3, 0.4]}>
        <meshStandardMaterial color={buttonYellow} />
      </Box>
      <Box castShadow receiveShadow args={[0.24, 0.08, 0.05]} position={[-0.3, -0.3, 0.4]}>
        <meshStandardMaterial color={buttonYellow} />
      </Box>

      {/* Circle Buttons */}
      <Cylinder castShadow receiveShadow args={[0.06, 0.06, 0.05, 16]} position={[0.1, -0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={buttonGreen} />
      </Cylinder>
      <Cylinder castShadow receiveShadow args={[0.08, 0.08, 0.05, 16]} position={[0.3, -0.35, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={buttonRed} />
      </Cylinder>
      <Cylinder castShadow receiveShadow args={[0.05, 0.05, 0.05, 16]} position={[0.4, -0.15, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={buttonBlue} />
      </Cylinder>

      {/* Select/Start buttons */}
      <Box castShadow receiveShadow args={[0.08, 0.03, 0.05]} position={[-0.2, -0.1, 0.4]}>
        <meshStandardMaterial color={buttonBlue} />
      </Box>
      <Box castShadow receiveShadow args={[0.08, 0.03, 0.05]} position={[-0.05, -0.1, 0.4]}>
        <meshStandardMaterial color={buttonBlue} />
      </Box>

      {/* "BMO" Text on side */}
      <group position={[0.61, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Text fontSize={0.3} color={darkDetail} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff" letterSpacing={0.1}>
          BMO
        </Text>
      </group>
      
      {/* Side dots */}
      <Sphere castShadow receiveShadow args={[0.02, 8, 8]} position={[0.61, 0.7, 0.1]}><meshBasicMaterial color={darkDetail} /></Sphere>
      <Sphere castShadow receiveShadow args={[0.02, 8, 8]} position={[0.61, 0.8, 0]}><meshBasicMaterial color={darkDetail} /></Sphere>
      <Sphere castShadow receiveShadow args={[0.02, 8, 8]} position={[0.61, 0.6, -0.1]}><meshBasicMaterial color={darkDetail} /></Sphere>
      <Sphere castShadow receiveShadow args={[0.02, 8, 8]} position={[0.61, 0.7, -0.2]}><meshBasicMaterial color={darkDetail} /></Sphere>

      {/* Limbs */}
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.65, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.03, 0.7, 16]} />
        <meshStandardMaterial color={limbColor} />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.65, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.03, 0.7, 16]} />
        <meshStandardMaterial color={limbColor} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.3, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color={limbColor} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.3, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color={limbColor} />
      </mesh>
    </group>
  )
}
