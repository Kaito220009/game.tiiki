import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './GameContext'
import Menu from './components/Menu'
import Game from './components/Game'
import Inventory from './components/Inventory'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/battle" element={<Game />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
