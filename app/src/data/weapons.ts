import type { Weapon } from '../types'

export const sampleWeapons: Weapon[] = [
  {
    id: 1,
    name: '基本刀',
    attribute: '切削',
    weight: '中量',
    rarity: 'R',
    attack: 10,
    crit: 0.1,
  },
  {
    id: 2,
    name: '研磨ハンマー',
    attribute: '研磨',
    weight: '重量',
    rarity: 'SR',
    attack: 15,
    crit: 0.05,
  },
]
