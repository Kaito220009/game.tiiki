import { useState } from 'react'

// Types for weapon attributes
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

const weightCoeff: Record<Weight, number> = {
  '軽量': 0.8,
  '中量': 1.0,
  '重量': 1.3,
}

const rarityCoeff: Record<Rarity, number> = {
  'N': 0.9,
  'R': 1.0,
  'SR': 1.1,
  'UR': 1.3,
}

const baseStamina = 3

// attribute advantage matrix
const advantage: Record<Attribute, Attribute> = {
  '切削': '溶接',
  '溶接': '研磨',
  '研磨': '切削',
}
const disadvantage: Record<Attribute, Attribute> = {
  '切削': '研磨',
  '溶接': '切削',
  '研磨': '溶接',
}

export interface Enemy {
  attribute: Attribute
  hp: number
}

// simple weapon pool
const sampleWeapons: Weapon[] = [
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
];

export default function Game() {
  const [stamina, setStamina] = useState(100)
  const [enemy, setEnemy] = useState<Enemy>({ attribute: '切削', hp: 30 })
  const [log, setLog] = useState<string[]>([])
  const [weapon, setWeapon] = useState<Weapon>(sampleWeapons[0])

  const consumeStamina = (amount: number) => {
    setStamina(s => Math.max(0, s - amount))
  }

  const calcStaminaCost = (w: Weapon) => {
    return baseStamina * weightCoeff[w.weight] * rarityCoeff[w.rarity]
  }

  const getDamageMultiplier = (w: Weapon, e: Enemy) => {
    if (advantage[w.attribute] === e.attribute) return 2
    if (disadvantage[w.attribute] === e.attribute) return 0.5
    return 1
  }

  const attack = () => {
    const cost = calcStaminaCost(weapon)
    if (stamina < cost) {
      setLog(l => [`スタミナ不足`, ...l])
      return
    }
    const dmg = weapon.attack * getDamageMultiplier(weapon, enemy)
    consumeStamina(cost)
    setEnemy(e => ({ ...e, hp: Math.max(0, e.hp - dmg) }))
    setLog(l => [`${weapon.name} で ${dmg.toFixed(0)} ダメージ!`, ...l])
  }

  const run = () => {
    setLog(l => [`逃げた`, ...l])
    // enemy HP stays
  }

  const useItem = () => {
    setStamina(100)
    setLog(l => [`スタミナを全回復した`, ...l])
  }

  return (
    <div>
      <h2>シンプルバトル</h2>
      <p>スタミナ: {stamina}</p>
      <p>敵 HP: {enemy.hp}</p>
      <div>
        <label>武器: </label>
        <select
          value={weapon.id}
          onChange={e => {
            const w = sampleWeapons.find(w => w.id === Number(e.target.value))!
            setWeapon(w)
          }}
        >
          {sampleWeapons.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>
      <button onClick={attack}>戦う</button>
      <button onClick={run}>逃げる</button>
      <button onClick={useItem}>アイテム</button>

      <h3>ログ</h3>
      <ul>
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  )
}
