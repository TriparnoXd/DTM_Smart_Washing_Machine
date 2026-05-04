import { motion } from 'framer-motion'

export default function WashBotStatus({ 
  state, 
  mousePosition 
}: { 
  state: string
  mousePosition: { x: number; y: number }
}) {
  const getStatusText = () => {
    switch(state) {
      case 'idle': return 'Ready to wash!'
      case 'washing': return 'Cleaning in progress...'
      case 'spinning': return 'Spinning at max speed!'
      case 'done': return 'Wash complete!'
      default: return 'Ready!'
    }
  }

  return (
    <motion.div
      className="absolute bottom-10 right-10 pointer-events-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-2 border-cyan-200">
        <div className="flex items-center gap-4">
          {/* Robot Avatar */}
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-lg"
            animate={{ 
              y: [0, -5, 0],
              rotate: mousePosition.x * 10
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤖
          </motion.div>

          {/* Status Info */}
          <div>
            <h4 className="font-bold text-slate-800 text-lg">WashBot</h4>
            <motion.p 
              className="text-sm text-slate-600"
              key={state}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {getStatusText()}
            </motion.p>
          </div>

          {/* Status Indicator */}
          <div className={`
            w-3 h-3 rounded-full
            ${state === 'idle' ? 'bg-green-500' : ''}
            ${state === 'washing' ? 'bg-blue-500 animate-pulse' : ''}
            ${state === 'spinning' ? 'bg-orange-500 animate-ping' : ''}
            ${state === 'done' ? 'bg-purple-500' : ''}
          `} />
        </div>
      </div>
    </motion.div>
  )
}
