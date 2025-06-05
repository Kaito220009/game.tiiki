import { Link } from 'react-router-dom'
import { useGame } from '../GameContext'
import { sampleWeapons } from '../data/weapons'

export default function Inventory() {
  const { weapon, setWeapon } = useGame()

  return (
    <div>
      <h2>装備一覧</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sampleWeapons.map(w => (
          <li key={w.id} style={{ margin: '1em 0' }}>
            <button
              onClick={() => setWeapon(w)}
              style={{ width: '200px' }}
            >
              {w.name}{w.id === weapon.id ? ' (装備中)' : ''}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/" style={{ display: 'block', marginTop: '1em' }}>戻る</Link>
    </div>
  )
}
