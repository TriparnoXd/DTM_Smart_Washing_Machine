import { create } from 'zustand'

interface WashState {
  washState: 'idle' | 'washing' | 'spinning' | 'done'
  setWashState: (state: 'idle' | 'washing' | 'spinning' | 'done') => void
  loadWeight: number
  setLoadWeight: (weight: number) => void
  detergentLevel: number
  setDetergentLevel: (level: number) => void
  energyUsage: number
  updateEnergyUsage: (usage: number) => void
}

export const useStore = create<WashState>((set) => ({
  washState: 'idle',
  setWashState: (state) => set({ washState: state }),
  loadWeight: 0,
  setLoadWeight: (weight) => set({ loadWeight: weight }),
  detergentLevel: 100,
  setDetergentLevel: (level) => set({ detergentLevel: level }),
  energyUsage: 0,
  updateEnergyUsage: (usage) => set((state) => ({ energyUsage: state.energyUsage + usage }))
}))
