import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shirt, Wind, Feather, Zap, Leaf } from 'lucide-react'

const washPrograms = [
  { id: 'cotton', name: 'Cotton', icon: Shirt, duration: '60 min', temp: '40°C' },
  { id: 'synthetic', name: 'Synthetic', icon: Wind, duration: '45 min', temp: '30°C' },
  { id: 'delicate', name: 'Delicate', icon: Feather, duration: '30 min', temp: '20°C' },
  { id: 'quick', name: 'Quick Wash', icon: Zap, duration: '15 min', temp: '30°C' },
  { id: 'eco', name: 'Eco Mode', icon: Leaf, duration: '90 min', temp: '40°C' }
]

export default function WashControls({ 
  washState, 
  setWashState 
}: { 
  washState: string
  setWashState: (state: string) => void
}) {
  const [selectedProgram, setSelectedProgram] = useState('cotton')

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
        {/* Program Selection */}
        <div className="flex gap-3 mb-6">
          {washPrograms.map((program) => (
            <motion.button
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className={`
                px-4 py-3 rounded-xl border-2 transition-all
                ${selectedProgram === program.id 
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700' 
                  : 'border-slate-200 hover:border-slate-300'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <program.icon className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium">{program.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => setWashState('washing')}
            disabled={washState !== 'idle'}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Wash
          </motion.button>
          
          <motion.button
            onClick={() => setWashState('idle')}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Stop
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
