'use client'

import { motion } from 'framer-motion'
import { X, Weight, BarChart3, Activity, Check, Droplet, TrendingDown, Target, Brain, Database, Zap, Award, DollarSign, Code, Layers, Cpu, Server, Rocket, Map, Globe, Shield, Lightbulb, Users, PenTool, LayoutTemplate } from 'lucide-react'

const featureData: Record<string, {
  title: string
  subtitle: string
  metrics: { label: string; value: string; unit: string; icon: React.ReactNode }[]
  color: string
}> = {
  'load-balance': {
    title: 'Smart Load Balancing',
    subtitle: 'Advanced Weight Detection',
    metrics: [
      { label: 'Current Weight', value: '4.5', unit: 'kg', icon: <Weight className="w-4 h-4" /> },
      { label: 'Distribution', value: '95', unit: '%', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Vibration', value: '12', unit: 'dB', icon: <Activity className="w-4 h-4" /> },
      { label: 'Balance Status', value: 'Optimal', unit: '', icon: <Check className="w-4 h-4" /> }
    ],
    color: 'cyan'
  },
  'detergent': {
    title: 'Detergent Optimization',
    subtitle: 'Precise Dispensing',
    metrics: [
      { label: 'Detergent', value: '45', unit: 'ml', icon: <Droplet className="w-4 h-4" /> },
      { label: 'Softener', value: '25', unit: 'ml', icon: <Droplet className="w-4 h-4" /> },
      { label: 'Savings', value: '40', unit: '%', icon: <TrendingDown className="w-4 h-4" /> },
      { label: 'Accuracy', value: '99', unit: '%', icon: <Target className="w-4 h-4" /> }
    ],
    color: 'blue'
  },
  'ai-learning': {
    title: 'AI Self-Learning',
    subtitle: 'Adaptive Wash Cycles',
    metrics: [
      { label: 'Learning Progress', value: '87', unit: '%', icon: <Brain className="w-4 h-4" /> },
      { label: 'Patterns Learned', value: '234', unit: '', icon: <Database className="w-4 h-4" /> },
      { label: 'Accuracy', value: '98.5', unit: '%', icon: <Target className="w-4 h-4" /> },
      { label: 'Optimizations', value: '42', unit: '', icon: <Zap className="w-4 h-4" /> }
    ],
    color: 'purple'
  },
  'energy': {
    title: 'Energy Efficiency',
    subtitle: 'Eco-Friendly Performance',
    metrics: [
      { label: 'Current Usage', value: '0.8', unit: 'kWh', icon: <Zap className="w-4 h-4" /> },
      { label: 'Savings', value: '45', unit: '%', icon: <TrendingDown className="w-4 h-4" /> },
      { label: 'Yearly Cost', value: '$48', unit: '', icon: <DollarSign className="w-4 h-4" /> },
      { label: 'Eco Score', value: 'A+++', unit: '', icon: <Award className="w-4 h-4" /> }
    ],
    color: 'green'
  },
  'tech-stack': {
    title: 'Modern Tech Stack',
    subtitle: 'Built with bleeding-edge web tech',
    metrics: [
      { label: 'Core', value: 'Next.js', unit: '14', icon: <Code className="w-4 h-4" /> },
      { label: '3D Engine', value: 'Three.js', unit: '', icon: <Layers className="w-4 h-4" /> },
      { label: 'State Mgmt', value: 'Zustand', unit: '', icon: <Cpu className="w-4 h-4" /> },
      { label: 'Hosting', value: 'Vercel', unit: '', icon: <Server className="w-4 h-4" /> }
    ],
    color: 'indigo'
  },
  'future-scope': {
    title: 'Future Scope',
    subtitle: 'Where we go from here',
    metrics: [
      { label: 'IoT Connect', value: 'WiFi', unit: '6E', icon: <Globe className="w-4 h-4" /> },
      { label: 'Smart Grid', value: 'V2G', unit: 'Sync', icon: <Map className="w-4 h-4" /> },
      { label: 'Auto Order', value: 'Soap', unit: 'API', icon: <Rocket className="w-4 h-4" /> },
      { label: 'Blockchain', value: 'Secure', unit: '', icon: <Shield className="w-4 h-4" /> }
    ],
    color: 'fuchsia'
  },
  'design-thinking': {
    title: 'Design Thinking',
    subtitle: 'User-Centric Architecture',
    metrics: [
      { label: 'Empathy', value: 'User', unit: 'First', icon: <Users className="w-4 h-4" /> },
      { label: 'Ideation', value: 'Rapid', unit: 'Proto', icon: <Lightbulb className="w-4 h-4" /> },
      { label: 'Design', value: 'Brutalism', unit: '', icon: <PenTool className="w-4 h-4" /> },
      { label: 'UI/UX', value: 'Glass', unit: 'Morphism', icon: <LayoutTemplate className="w-4 h-4" /> }
    ],
    color: 'rose'
  }
}

export default function FeatureDataPanel({ 
  feature, 
  onClose 
}: { 
  feature: string
  onClose: () => void
}) {
  const data = featureData[feature]
  
  if (!data) return null

  const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-500 bg-cyan-50 border-cyan-100',
    blue: 'text-blue-500 bg-blue-50 border-blue-100',
    purple: 'text-purple-500 bg-purple-50 border-purple-100',
    green: 'text-green-500 bg-green-50 border-green-100',
    indigo: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    fuchsia: 'text-fuchsia-500 bg-fuchsia-50 border-fuchsia-100',
    rose: 'text-rose-500 bg-rose-50 border-rose-100'
  }

  const progressClasses: Record<string, string> = {
    cyan: 'bg-cyan-100 border-cyan-500',
    blue: 'bg-blue-100 border-blue-500',
    purple: 'bg-purple-100 border-purple-500',
    green: 'bg-green-100 border-green-500',
    indigo: 'bg-indigo-100 border-indigo-500',
    fuchsia: 'bg-fuchsia-100 border-fuchsia-500',
    rose: 'bg-rose-100 border-rose-500'
  }

  const hexColors: Record<string, string> = {
    cyan: '#06b6d4',
    blue: '#3b82f6',
    purple: '#a855f7',
    green: '#22c55e',
    indigo: '#6366f1',
    fuchsia: '#d946ef',
    rose: '#f43f5e'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="absolute top-1/2 -translate-y-1/2 right-12 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{data.title}</h3>
          <p className="text-sm text-slate-500">{data.subtitle}</p>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${colorClasses[data.color]} rounded-2xl p-4 border`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-${data.color}-600`}>
                {metric.icon}
              </span>
              <span className="text-xs text-slate-500">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-800">{metric.value}</span>
              <span className="text-sm text-slate-500">{metric.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={`mt-6 h-2 ${progressClasses[data.color]} rounded-full overflow-hidden border`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className={`h-full bg-${data.color}-500`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2 }}
          style={{ backgroundColor: hexColors[data.color] }}
        />
      </motion.div>
    </motion.div>
  )
}