'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Grid, Sparkles, Torus, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import FeatureHotspots from './FeatureHotspots'
import FeatureDataPanel from './FeatureDataPanel'
import WashControls from './WashControls'
import WashingMachine3D from './WashingMachine3D'
import Robo3D from './Robo3D'
import CoverPage from './CoverPage'

function RippleWaves() {
  const wavesRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!wavesRef.current) return
    wavesRef.current.children.forEach((wave: any) => {
      // expand scale - slower
      wave.scale.x += delta * 0.6
      wave.scale.y += delta * 0.6
      
      // fade opacity
      if (wave.material) {
        wave.material.opacity -= delta * 0.15
      }

      // reset when too big
      if (wave.scale.x > 5) {
        wave.scale.set(1, 1, 1)
        wave.material.opacity = 0.8
      }
    })
  })

  return (
    <group ref={wavesRef} position={[0, -3.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh scale={[1, 1, 1]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
      </mesh>
      <mesh scale={[2.3, 2.3, 1]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>
      <mesh scale={[3.6, 3.6, 1]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function SceneShiftWrapper({ children }: { children: React.ReactNode }) {
  const { activeFeature } = useStore()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Shift left by 3.5 units when the panel opens to make room on the right
    const targetX = activeFeature ? -3.5 : 0
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 3)
  })

  return <group ref={groupRef}>{children}</group>
}

export default function SmartWashScene() {
  const { activeFeature, setActiveFeature } = useStore()

  return (
    <>
      <CoverPage />
      <motion.div 
        className="relative w-full h-screen overflow-hidden"
        animate={{
          background: [
            "linear-gradient(to bottom, #0f172a, #172554, #0f172a)", // Dark Blue / Slate
            "linear-gradient(to bottom, #020617, #2e1065, #020617)", // Deep Purple / Black
            "linear-gradient(to bottom, #3f000f, #220000, #000000)", // Crimson Red / Black
            "linear-gradient(to bottom, #082f49, #083344, #082f49)", // Deep Cyan
            "linear-gradient(to bottom, #0f172a, #172554, #0f172a)", // Loop back to start
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 1, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          
          {/* Key Light */}
          <directionalLight 
            castShadow 
            position={[5, 8, 5]} 
            intensity={1.5} 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024}
            shadow-camera-far={20}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          {/* Fill Light */}
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          {/* Rim Light */}
          <spotLight position={[0, 5, -5]} intensity={1} angle={Math.PI/4} penumbra={0.5} />
          
          <SceneShiftWrapper>
            {/* Ambient Motion & Depth */}
            <Sparkles count={80} scale={12} size={1.5} speed={0.4} opacity={0.3} color="#38bdf8" />
            <Grid 
              position={[0, -3.05, 0]} 
              args={[30, 30]} 
              cellSize={0.5} 
              cellThickness={1} 
              cellColor="#1e293b" 
              sectionSize={2.5} 
              sectionThickness={1.5} 
              sectionColor="#0ea5e9" 
              fadeDistance={15} 
              fadeStrength={1} 
            />
            
            {/* Glowing Pedestal Stage */}
            <group position={[0, -3.15, 0]}>
              <Cylinder receiveShadow args={[2.5, 2.8, 0.2, 64]}>
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
              </Cylinder>
              <Torus args={[2.6, 0.03, 16, 100]} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#0ea5e9" />
              </Torus>
              <Torus args={[2.3, 0.01, 16, 100]} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#38bdf8" />
              </Torus>
            </group>

            {/* Outward Ripple Waves */}
            <RippleWaves />

            {/* Machine Glowing Aura */}
            <pointLight position={[0, -0.5, -1.5]} distance={10} intensity={3} color="#0ea5e9" />
            
            <WashingMachine3D />
            <Robo3D />
            
            <ContactShadows position={[0, -3.04, 0]} opacity={0.6} scale={15} blur={1.5} far={4} color="#000000" />
          </SceneShiftWrapper>
          
          <Environment preset="city" />
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Title Overlay */}
      <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none text-center">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">SmartWash AI</h1>
        <p className="text-cyan-300/90 text-lg drop-shadow-md">Intelligent Laundry System</p>
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Left Sidebar Hotspots */}
        <FeatureHotspots 
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
        />

        <AnimatePresence>
          {activeFeature && (
            <FeatureDataPanel 
              feature={activeFeature}
              onClose={() => setActiveFeature(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Controls Layer */}
      <div className="relative z-30 pointer-events-auto">
        <WashControls />
      </div>
    </motion.div>
    </>
  )
}