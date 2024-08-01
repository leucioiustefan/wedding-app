import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import UploadProcess from './components/UploadProcess'
import ViewPhotos from './components/ViewPhotos'
import ThankYouPage from './components/ThankYouPage'
import './index.css'

function App() {
  const [hasUploadedPhotos, setHasUploadedPhotos] = useState(false)

  useEffect(() => {
    const checkUploadedPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photos')
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