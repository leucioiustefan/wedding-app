import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import UploadProcess from './components/UploadProcess'
import ThankYouPage from './components/ThankYouPage'
import './index.css'

function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadProcess />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App