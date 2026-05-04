'use client'

import Spline from '@splinetool/react-spline'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { useMouseInteraction } from '@/hooks/useMouseInteraction'
import FeatureHotspots from './FeatureHotspots'
import FeatureDataPanel from './FeatureDataPanel'
import WashBotStatus from './WashBotStatus'
import WashControls from './WashControls'

export default function SmartWashScene() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const { washState, setWashState } = useStore()
  const mousePosition = useMouseInteraction()

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Scene */}
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        className="w-full h-full"
      />

      {/* Interactive UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Feature Hotspots */}
        <FeatureHotspots 
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
        />

        {/* Real-time Data Display */}
        <AnimatePresence>
          {activeFeature && (
            <FeatureDataPanel 
              feature={activeFeature}
              onClose={() => setActiveFeature(null)}
            />
          )}
        </AnimatePresence>

        {/* WashBot Status */}
        <WashBotStatus 
          state={washState}
          mousePosition={mousePosition}
        />
      </div>

      {/* Control Panel */}
      <WashControls 
        washState={washState}
        setWashState={setWashState}
      />
    </div>
  )
}
