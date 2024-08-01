import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '../Modal'

const ViewPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://api.wedding-app.click/photos')
        setPhotos(response.data)
        setError(null)
      } catch (error) {
        console.error('Failed to fetch photos:', error)
        setError('Failed to load photos. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const openModal = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  if (loading) {
    return <div className="loading">Loading photos...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <motion.div
      className="view-photos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Wedding Photo Album</h2>
      <AnimatePresence>
        {photos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No photos uploaded yet. Be the first to share your memories!
          </motion.p>
        ) : (
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.path}
                className="photo-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => openModal(photo)}
              >
                <img 
                  src={`http://localhost:5000${photo.path}`} 
                  alt={`Photo by ${photo.author}`} 
                  loading="lazy"
                />
                <div className="photo-info">
                  <p>By: {photo.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      {selectedPhoto && (
        <Modal onClose={closeModal}>
          <img 
            src={`http://localhost:5000${selectedPhoto.path}`} 
            alt={`Photo by ${selectedPhoto.author}`} 
            style={{ maxWidth: '100%', maxHeight: '90vh' }}
          />
          <p>By: {selectedPhoto.author}</p>
        </Modal>
      )}
    </motion.div>
  )
}

export default ViewPhotos