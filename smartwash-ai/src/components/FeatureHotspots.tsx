'use client'

import { motion } from 'framer-motion'
import { Droplet, Activity, Brain, Zap } from 'lucide-react'

interface Hotspot {
  id: string
  position: { top: string; left: string }
  label: string
  labelZh: string
  icon: 'droplet' | 'activity' | 'brain' | 'zap'
  color: string
}

const hotspots: Hotspot[] = [
  {
    id: 'load-balance',
    position: { top: '65%', left: '35%' },
    label: 'Load Balancing',
    labelZh: '智能负载平衡',
    icon: 'activity',
    color: 'cyan'
  },
  {
    id: 'detergent',
    position: { top: '25%', left: '42%' },
    label: 'Detergent Optimizer',
    labelZh: '洗涤剂精准优化',
    icon: 'droplet',
    color: 'blue'
  },
  {
    id: 'ai-learning',
    position: { top: '40%', left: '65%' },
    label: 'AI Self-Learning',
    labelZh: 'AI 自学习模式',
    icon: 'brain',
    color: 'purple'
  },
  {
    id: 'energy',
    position: { top: '55%', left: '20%' },
    label: 'Energy Efficiency',
    labelZh: '能源效率',
    icon: 'zap',
    color: 'green'
  }
]

const IconMap = {
  droplet: Droplet,
  activity: Activity,
  brain: Brain,
  zap: Zap
}

export default function FeatureHotspots({ 
  activeFeature, 
  setActiveFeature,
  mousePosition 
}: {
  activeFeature: string | null
  setActiveFeature: (id: string) => void
  mousePosition: { x: number; y: number }
}) {
  return (
    <>
      {hotspots.map((hotspot) => {
        const isActive = activeFeature === hotspot.id
        const IconComponent = IconMap[hotspot.icon]
        
        return (
          <motion.div
            key={hotspot.id}
            style={{ 
              position: 'absolute',
              top: hotspot.position.top,
              left: hotspot.position.left,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isActive ? 1.2 : 1,
              opacity: 1,
              zIndex: isActive ? 50 : 10
            }}
            whileHover={{ scale: 1.1 }}
            className="pointer-events-auto cursor-pointer"
            onClick={() => setActiveFeature(hotspot.id)}
          >
            {/* Pulsing Ring */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-${hotspot.color}-500/30`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 60, height: 60, marginLeft: -10, marginTop: -10 }}
            />
            
            {/* Main Hotspot */}
            <div className={`
              relative w-10 h-10 rounded-full 
              bg-${hotspot.color}-500 
              flex items-center justify-center
              shadow-lg shadow-${hotspot.color}-500/50
              border-2 border-white/50
            `}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                absolute top-12 left-1/2 -translate-x-1/2
                bg-white/90 backdrop-blur-md px-4 py-2
                rounded-xl shadow-xl whitespace-nowrap
                border border-${hotspot.color}-200
              `}
            >
              <p className="text-sm font-bold text-slate-800">{hotspot.label}</p>
              <p className="text-xs text-slate-500">{hotspot.labelZh}</p>
            </motion.div>
          </motion.div>
        )
      })}
    </>
  )
}
