'use client'

import { motion } from 'framer-motion'
import { Play, RotateCcw, Settings, Power } from 'lucide-react'
import { useStore, WashState } from '@/store/useStore'

export default function WashControls() {
  const { washState, setWashState } = useStore()

  const buttons: { id: WashState; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'idle', label: 'Idle', icon: <Power className="w-4 h-4" />, color: 'slate' },
    { id: 'washing', label: 'Wash', icon: <Play className="w-4 h-4" />, color: 'blue' },
    { id: 'spinning', label: 'Spin', icon: <RotateCcw className="w-4 h-4" />, color: 'purple' },
    { id: 'done', label: 'Done', icon: <Settings className="w-4 h-4" />, color: 'green' }
  ]

  const colorClasses: Record<string, { bg: string; text: string; active: string }> = {
    slate: { bg: 'bg-slate-200', text: 'text-slate-700', active: 'bg-slate-600' },
    blue: { bg: 'bg-blue-200', text: 'text-blue-700', active: 'bg-blue-600' },
    purple: { bg: 'bg-purple-200', text: 'text-purple-700', active: 'bg-purple-600' },
    green: { bg: 'bg-green-200', text: 'text-green-700', active: 'bg-green-600' }
  }

  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/50">
        <div className="flex gap-3">
          {buttons.map((btn) => (
            <motion.button
              key={btn.id}
              onClick={() => setWashState(btn.id)}
              className={`
                px-5 py-3 rounded-xl font-medium text-sm
                ${colorClasses[btn.color].bg} ${colorClasses[btn.color].text}
                transition-colors flex items-center gap-2
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {washState === btn.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`w-2 h-2 rounded-full ${colorClasses[btn.color].active}`}
                />
              )}
              {btn.icon}
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}