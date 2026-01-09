import './App.css'
import Sidebar from './components/Sidebar'
import Terminal from './components/Terminal'
import ContentSection from './components/ContentSection'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Terminal />
        <ContentSection />
      </div>
    </div>
  )
}

export default App
