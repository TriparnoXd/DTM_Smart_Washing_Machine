'use client'

import { motion } from 'framer-motion'
import { Activity, Droplet, Brain, Zap, Code, Rocket, Lightbulb } from 'lucide-react'

interface Hotspot {
  id: string
  label: string
  subtitle: string
  icon: React.ReactNode
  color: string
}

const hotspots: Hotspot[] = [
  {
    id: 'load-balance',
    label: 'Load Balancing',
    subtitle: 'Smart Weight Detection',
    icon: <Activity className="w-5 h-5" />,
    color: 'cyan'
  },
  {
    id: 'detergent',
    label: 'Detergent Optimizer',
    subtitle: 'Precise Dispensing',
    icon: <Droplet className="w-5 h-5" />,
    color: 'blue'
  },
  {
    id: 'ai-learning',
    label: 'AI Self-Learning',
    subtitle: 'Adaptive Wash Cycles',
    icon: <Brain className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 'energy',
    label: 'Energy Efficiency',
    subtitle: 'Eco-Friendly Modes',
    icon: <Zap className="w-5 h-5" />,
    color: 'green'
  },
  {
    id: 'tech-stack',
    label: 'Tech Stack',
    subtitle: 'Next.js & Three.js',
    icon: <Code className="w-5 h-5" />,
    color: 'indigo'
  },
  {
    id: 'future-scope',
    label: 'Future Scope',
    subtitle: 'IoT & Smart Grid',
    icon: <Rocket className="w-5 h-5" />,
    color: 'fuchsia'
  },
  {
    id: 'design-thinking',
    label: 'Design Thinking',
    subtitle: 'User-Centric UI',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'rose'
  }
]

export default function FeatureHotspots({ 
  activeFeature, 
  setActiveFeature
}: {
  activeFeature: string | null
  setActiveFeature: (id: string | null) => void
}) {
  const colorClasses: Record<string, string> = {
    cyan: 'bg-cyan-500 shadow-cyan-500/50 border-cyan-300',
    blue: 'bg-blue-500 shadow-blue-500/50 border-blue-300',
    purple: 'bg-purple-500 shadow-purple-500/50 border-purple-300',
    green: 'bg-green-500 shadow-green-500/50 border-green-300',
    indigo: 'bg-indigo-500 shadow-indigo-500/50 border-indigo-300',
    fuchsia: 'bg-fuchsia-500 shadow-fuchsia-500/50 border-fuchsia-300',
    rose: 'bg-rose-500 shadow-rose-500/50 border-rose-300'
  }

  const ringClasses: Record<string, string> = {
    cyan: 'bg-cyan-500/30',
    blue: 'bg-blue-500/30',
    purple: 'bg-purple-500/30',
    green: 'bg-green-500/30',
    indigo: 'bg-indigo-500/30',
    fuchsia: 'bg-fuchsia-500/30',
    rose: 'bg-rose-500/30'
  }

  const labelClasses: Record<string, string> = {
    cyan: 'border-cyan-200 text-cyan-800',
    blue: 'border-blue-200 text-blue-800',
    purple: 'border-purple-200 text-purple-800',
    green: 'border-green-200 text-green-800',
    indigo: 'border-indigo-200 text-indigo-800',
    fuchsia: 'border-fuchsia-200 text-fuchsia-800',
    rose: 'border-rose-200 text-rose-800'
  }

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 pointer-events-auto">
      {hotspots.map((hotspot) => {
        const isActive = activeFeature === hotspot.id
        
        return (
          <div key={hotspot.id} className="relative flex items-center group cursor-pointer" onClick={() => setActiveFeature(isActive ? null : hotspot.id)}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isActive ? 1.2 : 1,
                opacity: 1
              }}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <div className={`relative w-12 h-12 rounded-full ${colorClasses[hotspot.color]} flex items-center justify-center shadow-lg border-2 z-10`}>
                <span className="text-white">{hotspot.icon}</span>
              </div>
              {isActive && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${ringClasses[hotspot.color]}`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 64, height: 64, marginLeft: -8, marginTop: -8 }}
                />
              )}
            </motion.div>

            {/* Label Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
              className={`ml-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl whitespace-nowrap border ${labelClasses[hotspot.color]}`}
            >
              <p className="text-sm font-bold">{hotspot.label}</p>
              <p className="text-xs opacity-80">{hotspot.subtitle}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}