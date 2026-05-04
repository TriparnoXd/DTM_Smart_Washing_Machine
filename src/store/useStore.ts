import { create } from 'zustand'

export type WashState = 'idle' | 'washing' | 'spinning' | 'done'

interface StoreState {
  isRevealed: boolean
  setIsRevealed: (revealed: boolean) => void
  washState: WashState
  setWashState: (state: WashState) => void
  activeFeature: string | null
  setActiveFeature: (feature: string | null) => void
  currentWeight: number
  setCurrentWeight: (weight: number) => void
  energyUsage: number
  setEnergyUsage: (usage: number) => void
  aiProgress: number
  setAiProgress: (progress: number) => void
  detergentAmount: number
  setDetergentAmount: (amount: number) => void
}

export const useStore = create<StoreState>((set) => ({
  isRevealed: false,
  setIsRevealed: (revealed) => set({ isRevealed: revealed }),
  washState: 'idle',
  setWashState: (state) => set({ washState: state }),
  activeFeature: null,
  setActiveFeature: (feature) => set({ activeFeature: feature }),
  currentWeight: 4.5,
  setCurrentWeight: (weight) => set({ currentWeight: weight }),
  energyUsage: 0.8,
  setEnergyUsage: (usage) => set({ energyUsage: usage }),
  aiProgress: 87,
  setAiProgress: (progress) => set({ aiProgress: progress }),
  detergentAmount: 45,
  setDetergentAmount: (amount) => set({ detergentAmount: amount }),
}))