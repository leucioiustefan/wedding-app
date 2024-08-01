import  { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import UploadProcess from './components/UploadProcess'
import './index.css'

function App() {
  const [hasUploadedPhotos, setHasUploadedPhotos] = useState(false)

  useEffect(() => {
    const checkUploadedPhotos = async () => {
      try {
        const response = await axios.get('http://api.wedding-app.click/photos')
        setHasUploadedPhotos(response.data.length > 0)
      } catch (error) {
        console.error('Failed to check for uploaded photos:', error)
      }
    }

    checkUploadedPhotos()
  }, [])

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadProcess onUploadSuccess={() => setHasUploadedPhotos(true)} />} />
            {/* <Route path="/view" element={<ViewPhotos />} /> */}
            {/* <Route path="/thank-you" element={<ThankYouPage />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App