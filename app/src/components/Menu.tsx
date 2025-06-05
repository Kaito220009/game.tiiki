import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
      <h1>メニュー</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Link to="/battle"><button>戦う</button></Link>
        <Link to="/inventory"><button>装備</button></Link>
      </div>
    </div>
  )
}
