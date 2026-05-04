'use client'

import { motion } from 'framer-motion'
import { WashState } from '@/store/useStore'

export default function WashBotStatus({ 
  state
}: { 
  state: WashState
}) {
  const getStatusEmoji = () => {
    switch(state) {
      case 'idle': return '😊'
      case 'washing': return '🧼'
      case 'spinning': return '🌀'
      case 'done': return '✨'
      default: return '😊'
    }
  }

  const getStatusText = () => {
    switch(state) {
      case 'idle': return 'Ready to wash!'
      case 'washing': return 'Cleaning in progress...'
      case 'spinning': return 'Spinning at max speed!'
      case 'done': return 'Wash complete!'
      default: return 'Ready!'
    }
  }

  const getStatusColor = () => {
    switch(state) {
      case 'idle': return 'border-cyan-200'
      case 'washing': return 'border-blue-200'
      case 'spinning': return 'border-purple-200'
      case 'done': return 'border-green-200'
      default: return 'border-cyan-200'
    }
  }

  return (
    <motion.div
      className="absolute bottom-10 right-10 pointer-events-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-2 ${getStatusColor()}`}>
        <div className="flex items-center gap-4">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl"
            animate={state === 'spinning' ? { rotate: 360 } : state === 'washing' ? { scale: [1, 1.1, 1] } : {}}
            transition={state === 'spinning' ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 1.5, repeat: Infinity }}
          >
            {getStatusEmoji()}
          </motion.div>
          <div>
            <h4 className="text-lg font-bold text-slate-800">WashBot AI</h4>
            <p className="text-sm text-slate-500">{getStatusText()}</p>
            <motion.div 
              className="flex gap-1 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{ 
                    scale: state === 'idle' ? 1 : 
                           state === 'washing' ? [1, 1.5, 1] :
                           state === 'spinning' ? [1, 1.5, 1] :
                           1
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}