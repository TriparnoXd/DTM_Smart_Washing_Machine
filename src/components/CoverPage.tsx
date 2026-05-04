'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function CoverPage() {
  const { isRevealed, setIsRevealed } = useStore()

  if (isRevealed) return null

  // Cool blue color palette matching the main application
  const waveColors = [
    '#e0f2fe', // Light sky
    '#7dd3fc', // Sky blue
    '#38bdf8', // Cyan/Light blue
    '#0284c7', // Bright blue
    '#0369a1', // Deep blue
    '#1d4ed8', // Royal blue
    '#1e3a8a', // Dark blue
    '#0f172a', // Slate very dark
    '#020617', // Almost black blue
  ]

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#020617]"
        >
          {/* Animated Wavy Background Layers */}
          <div className="absolute inset-0 w-[300vw] h-full flex flex-col justify-end -z-10">
            {waveColors.map((color, index) => {
              // Create overlapping parallax waves
              const duration = 15 + index * 3
              const height = 110 - index * 9
              
              return (
                <motion.div
                  key={color}
                  initial={{ x: 0 }}
                  animate={{ x: '-33.33%' }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-full"
                  style={{
                    height: `${height}%`,
                    bottom: 0,
                    zIndex: waveColors.length - index,
                  }}
                >
                  <svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    style={{ fill: color, display: 'block', transform: 'scaleY(2.5)', transformOrigin: 'bottom' }}
                  >
                    {/* SVG wave paths combining curves for a fluid look */}
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z" opacity=".5" />
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
                  </svg>
                </motion.div>
              )
            })}
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="z-10 flex flex-col items-center gap-8 bg-black/20 p-12 rounded-3xl backdrop-blur-sm border border-white/10"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl text-center">
              SmartWash <span className="text-cyan-400">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 font-medium tracking-wide">
              The Future of Laundry is Here.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRevealed(true)}
              className="mt-8 px-10 py-4 bg-white text-cyan-900 text-xl font-bold rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3"
            >
              Explore System
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
