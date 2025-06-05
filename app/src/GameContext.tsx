import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Weapon } from './types'
import { sampleWeapons } from './data/weapons'

interface GameState {
  weapon: Weapon
  setWeapon: React.Dispatch<React.SetStateAction<Weapon>>
  stamina: number
  setStamina: React.Dispatch<React.SetStateAction<number>>
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [weapon, setWeapon] = useState<Weapon>(sampleWeapons[0])
  const [stamina, setStamina] = useState(100)

  return (
    <GameContext.Provider value={{ weapon, setWeapon, stamina, setStamina }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
