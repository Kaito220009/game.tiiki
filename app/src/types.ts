export type Attribute = '切削' | '溶接' | '研磨'
export type Weight = '軽量' | '中量' | '重量'
export type Rarity = 'N' | 'R' | 'SR' | 'UR'

export interface Weapon {
  id: number
  name: string
  attribute: Attribute
  weight: Weight
  rarity: Rarity
  attack: number
  crit: number
}

export interface Enemy {
  attribute: Attribute
  hp: number
}
