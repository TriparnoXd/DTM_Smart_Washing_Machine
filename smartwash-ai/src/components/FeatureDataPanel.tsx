import { motion, AnimatePresence } from 'framer-motion'
import { Droplet, Activity, Brain, Zap, TrendingDown, Target, Database, Award, DollarSign, CheckCircle, Weight, BarChart3 } from 'lucide-react'

const IconMap = {
  droplet: Droplet,
  activity: Activity,
  brain: Brain,
  zap: Zap,
  'trending-down': TrendingDown,
  target: Target,
  database: Database,
  award: Award,
  dollar: DollarSign,
  check: CheckCircle,
  weight: Weight,
  chart: BarChart3
}

const featureData = {
  'load-balance': {
    title: '智能负载平衡',
    titleEn: 'Smart Load Balancing',
    metrics: [
      { label: 'Current Weight', value: '4.5', unit: 'kg', icon: 'weight' },
      { label: 'Distribution', value: '95', unit: '%', icon: 'chart' },
      { label: 'Vibration', value: '12', unit: 'dB', icon: 'activity' },
      { label: 'Balance Status', value: 'Optimal', unit: '', icon: 'check' }
    ],
    animation: 'show-sensors',
    color: 'cyan'
  },
  'detergent': {
    title: '洗涤剂精准优化',
    titleEn: 'Detergent Optimization',
    metrics: [
      { label: 'Detergent', value: '45', unit: 'ml', icon: 'droplet' },
      { label: 'Softener', value: '25', unit: 'ml', icon: 'droplet' },
      { label: 'Savings', value: '40', unit: '%', icon: 'trending-down' },
      { label: 'Accuracy', value: '99', unit: '%', icon: 'target' }
    ],
    animation: 'show-flow',
    color: 'blue'
  },
  'ai-learning': {
    title: 'AI 自学习模式',
    titleEn: 'AI Self-Learning',
    metrics: [
      { label: 'Learning Progress', value: '87', unit: '%', icon: 'brain' },
      { label: 'Patterns Learned', value: '234', unit: '', icon: 'database' },
      { label: 'Accuracy', value: '98.5', unit: '%', icon: 'target' },
      { label: 'Optimizations', value: '42', unit: '', icon: 'zap' }
    ],
    animation: 'show-neural',
    color: 'purple'
  },
  'energy': {
    title: '能源效率',
    titleEn: 'Energy Efficiency',
    metrics: [
      { label: 'Current Usage', value: '0.8', unit: 'kWh', icon: 'zap' },
      { label: 'Savings', value: '45', unit: '%', icon: 'trending-down' },
      { label: 'Yearly Cost', value: '$48', unit: '', icon: 'dollar' },
      { label: 'Eco Score', value: 'A+++', unit: '', icon: 'award' }
    ],
    animation: 'show-graph',
    color: 'green'
  }
}

export default function FeatureDataPanel({ 
  feature, 
  onClose 
}: { 
  feature: string
  onClose: () => void
}) {
  const data = featureData[feature as keyof typeof featureData]
  
  if (!data) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute top-20 left-20 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{data.title}</h3>
          <p className="text-sm text-slate-500">{data.titleEn}</p>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <span className="text-slate-600 text-lg">×</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {data.metrics.map((metric, index) => {
          const IconComponent = IconMap[metric.icon as keyof typeof IconMap] || Zap
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className={`w-4 h-4 text-${data.color}-500`} />
                <span className="text-xs text-slate-500">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-800">{metric.value}</span>
                <span className="text-sm text-slate-500">{metric.unit}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Animation Progress Bar */}
      <motion.div
        className={`mt-6 h-2 bg-${data.color}-100 rounded-full overflow-hidden`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className={`h-full bg-${data.color}-500`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2 }}
        />
      </motion.div>
    </motion.div>
  )
}
