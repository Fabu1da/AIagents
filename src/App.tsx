import './App.css'
import { Agent } from './agent/Agent'

function App() {

  return (
    <div className="w-full h-screen flex items-center justify-center p-5 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgb(10, 14, 39), rgb(15, 22, 41), rgb(10, 14, 39))' }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 217, 255, 0.1)' }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(255, 0, 110, 0.1)', animationDelay: '1s' }}></div>
      <Agent />
    </div>
  )
}

export default App
