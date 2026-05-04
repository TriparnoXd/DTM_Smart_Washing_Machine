'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '@/store/useStore'
import { RoundedBox, Cylinder, Circle, Box } from '@react-three/drei'
import * as THREE from 'three'

export default function WashingMachine3D() {
  const { washState } = useStore()
  const machineRef = useRef<THREE.Group>(null)
  const drumRef = useRef<THREE.Group>(null)
  const waterRef = useRef<THREE.Mesh>(null)
  
  // Keep track of current speed for smooth transitions
  const [currentSpeed, setCurrentSpeed] = useState(0)

  useFrame((state, delta) => {
    if (drumRef.current) {
      let targetSpeed = 0
      if (washState === 'washing') targetSpeed = 4
      if (washState === 'spinning') targetSpeed = 20
      
      const newSpeed = THREE.MathUtils.lerp(currentSpeed, targetSpeed, delta * 2)
      setCurrentSpeed(newSpeed)
      drumRef.current.rotation.z -= newSpeed * delta
    }

    if (machineRef.current) {
      // Base hover position
      const hoverY = -0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.08
      
      if (washState === 'spinning') {
        machineRef.current.position.x = (Math.random() - 0.5) * 0.04
        machineRef.current.position.y = hoverY + (Math.random() - 0.5) * 0.06
      } else {
        machineRef.current.position.x = THREE.MathUtils.lerp(machineRef.current.position.x, 0, 0.1)
        machineRef.current.position.y = THREE.MathUtils.lerp(machineRef.current.position.y, hoverY, 0.1)
      }
    }

    if (waterRef.current) {
      let targetY = -0.7 // Hidden
      if (washState === 'washing') targetY = -0.1
      if (washState === 'spinning') targetY = -0.1
      
      waterRef.current.position.y = THREE.MathUtils.lerp(waterRef.current.position.y, targetY, delta * 2)
      
      // Slosh and Spin effects
      if (washState === 'washing') {
        waterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1
        waterRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.1
        
        // Normal water volume
        waterRef.current.scale.x = THREE.MathUtils.lerp(waterRef.current.scale.x, 1 + Math.sin(state.clock.elapsedTime * 5) * 0.02, 0.1)
        waterRef.current.scale.y = THREE.MathUtils.lerp(waterRef.current.scale.y, 1 + Math.sin(state.clock.elapsedTime * 5) * 0.02, 0.1)
        waterRef.current.scale.z = THREE.MathUtils.lerp(waterRef.current.scale.z, 1, 0.1)
      } else if (washState === 'spinning') {
        // High speed spinning: water flattens against the walls due to centripetal force
        waterRef.current.rotation.z += delta * 15
        waterRef.current.rotation.x = THREE.MathUtils.lerp(waterRef.current.rotation.x, 0, 0.1)
        
        // Stretch horizontally, flatten vertically
        waterRef.current.scale.x = THREE.MathUtils.lerp(waterRef.current.scale.x, 1.1, 0.1)
        waterRef.current.scale.y = THREE.MathUtils.lerp(waterRef.current.scale.y, 0.4, 0.1)
        waterRef.current.scale.z = THREE.MathUtils.lerp(waterRef.current.scale.z, 1.1, 0.1)
      } else {
        waterRef.current.rotation.z = THREE.MathUtils.lerp(waterRef.current.rotation.z, 0, 0.1)
        waterRef.current.rotation.x = THREE.MathUtils.lerp(waterRef.current.rotation.x, 0, 0.1)
        
        waterRef.current.scale.x = THREE.MathUtils.lerp(waterRef.current.scale.x, 1, 0.1)
        waterRef.current.scale.y = THREE.MathUtils.lerp(waterRef.current.scale.y, 1, 0.1)
        waterRef.current.scale.z = THREE.MathUtils.lerp(waterRef.current.scale.z, 1, 0.1)
      }
    }
  })

  // Materials based on the silver Samsung reference image
  const bodyMaterial = <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.3} />
  const whiteMaterial = <meshStandardMaterial color="#f8fafc" roughness={0.5} metalness={0.1} />
  const darkPlastic = <meshStandardMaterial color="#334155" roughness={0.6} />
  const silverMetal = <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
  const screenMaterial = <meshBasicMaterial color="#0ea5e9" />

  return (
    <group ref={machineRef} position={[0, -0.8, 0]} scale={1.8}>
      
      {/* Main Body (Silver) */}
      <RoundedBox castShadow receiveShadow args={[2, 2.3, 1.8]} position={[0, -0.1, 0]} radius={0.05} smoothness={4}>
        {bodyMaterial}
      </RoundedBox>

      {/* Top Cover (White) */}
      <Box castShadow receiveShadow args={[2.02, 0.1, 1.82]} position={[0, 1.1, 0]}>
        {whiteMaterial}
      </Box>

      {/* Control Panel Area (Top Front) */}
      {/* Control Panel Base */}
      <Box castShadow receiveShadow args={[2, 0.35, 0.1]} position={[0, 0.88, 0.86]}>
        {bodyMaterial}
      </Box>

      {/* Detergent Drawer (Left) */}
      <Box castShadow receiveShadow args={[0.5, 0.25, 0.05]} position={[-0.6, 0.88, 0.9]}>
        {whiteMaterial}
      </Box>
      {/* Detergent Drawer Handle Indent */}
      <Box castShadow receiveShadow args={[0.3, 0.05, 0.01]} position={[-0.6, 0.88, 0.93]}>
        {bodyMaterial}
      </Box>

      {/* Display Screen */}
      <Box castShadow receiveShadow args={[0.4, 0.18, 0.02]} position={[0.2, 0.92, 0.91]}>
        {screenMaterial}
      </Box>

      {/* Dial Knob */}
      <Cylinder castShadow receiveShadow args={[0.08, 0.08, 0.05, 32]} position={[0.7, 0.92, 0.91]} rotation={[Math.PI / 2, 0, 0]}>
        {silverMetal}
      </Cylinder>

      {/* Small Buttons under Display */}
      <Box castShadow receiveShadow args={[0.08, 0.03, 0.02]} position={[0.05, 0.78, 0.91]}>{silverMetal}</Box>
      <Box castShadow receiveShadow args={[0.08, 0.03, 0.02]} position={[0.2, 0.78, 0.91]}>{silverMetal}</Box>
      <Box castShadow receiveShadow args={[0.08, 0.03, 0.02]} position={[0.35, 0.78, 0.91]}>{silverMetal}</Box>

      {/* Bottom Filter Door (Bottom Right) */}
      <Box castShadow receiveShadow args={[0.4, 0.2, 0.02]} position={[0.6, -1.0, 0.9]}>
        {bodyMaterial}
      </Box>
      {/* Indent line for bottom panel */}
      <Box castShadow receiveShadow args={[2.0, 0.02, 0.01]} position={[0, -0.85, 0.91]}>
        <meshStandardMaterial color="#94a3b8" />
      </Box>

      {/* Inner Drum & Door Group */}
      <group position={[0, -0.1, 0.6]}>
        {/* Dark interior hole of the machine */}
        <Cylinder castShadow receiveShadow args={[0.65, 0.65, 0.8, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.2]}>
          <meshStandardMaterial color="#0f172a" side={THREE.BackSide} />
        </Cylinder>

        {/* Water Animation */}
        <mesh ref={waterRef} position={[0, -0.7, -0.2]} castShadow receiveShadow>
          <sphereGeometry args={[0.58, 32, 32]} />
          <meshPhysicalMaterial 
            color="#38bdf8" 
            transmission={0.9} 
            opacity={0.8}
            transparent={true}
            roughness={0.1}
            ior={1.33}
          />
        </mesh>
        
        {/* The rotating drum itself */}
        <group ref={drumRef} position={[0, 0, -0.2]}>
          <Cylinder castShadow receiveShadow args={[0.6, 0.6, 0.7, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} wireframe={true} />
          </Cylinder>
          {/* Drum back wall */}
          <Circle castShadow receiveShadow args={[0.6, 64]} position={[0, 0, -0.34]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
          </Circle>
          
          {/* Drum Lifters / Paddles (Makes the spinning clearly visible) */}
          <Box castShadow receiveShadow args={[0.1, 0.1, 0.7]} position={[0, 0.55, 0]} rotation={[0, 0, 0]}>
            {silverMetal}
          </Box>
          <Box castShadow receiveShadow args={[0.1, 0.1, 0.7]} position={[-0.48, -0.28, 0]} rotation={[0, 0, Math.PI / 3 * 2]}>
            {silverMetal}
          </Box>
          <Box castShadow receiveShadow args={[0.1, 0.1, 0.7]} position={[0.48, -0.28, 0]} rotation={[0, 0, -Math.PI / 3 * 2]}>
            {silverMetal}
          </Box>
        </group>

        {/* Thick Door Frame / Ring (Silver) */}
        <Cylinder castShadow receiveShadow args={[0.8, 0.8, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.35]}>
          {silverMetal}
        </Cylinder>
        {/* Inner Door Ring (Dark/Plastic) */}
        <Cylinder castShadow receiveShadow args={[0.68, 0.68, 0.12, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.35]}>
          {darkPlastic}
        </Cylinder>
        
        {/* Door Glass - Using MeshPhysicalMaterial for curved bowl glass effect */}
        <mesh position={[0, 0, 0.32]} castShadow receiveShadow>
          <sphereGeometry args={[0.65, 64, 32, 0, Math.PI * 2, 0, Math.PI / 3]} />
          <meshPhysicalMaterial 
            color="#bae6fd" 
            transmission={0.95} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.05} 
            ior={1.5} 
            thickness={0.05} 
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}
