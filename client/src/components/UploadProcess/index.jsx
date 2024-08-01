import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'

const UploadProcess = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for existing author name cookie when component mounts
    const savedAuthor = Cookies.get('authorName')
    if (savedAuthor) {
      setAuthor(savedAuthor)
    }
  }, [])

  const handleFileSelect = (event) => {
    setSelectedFiles(Array.from(event.target.files))
  }

  const handleAuthorChange = (event) => {
    const newAuthor = event.target.value
    setAuthor(newAuthor)
    // Save the author name to a cookie whenever it changes
    Cookies.set('authorName', newAuthor, { expires: 365 }) // Cookie expires in 1 year
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !author) {
      alert('Please select files and enter author name')
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    selectedFiles.forEach((file) => formData.append('photos', file))
    formData.append('author', author)

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setIsLoading(false)
      onUploadSuccess() // Call this function after successful upload
      
      const hasUploadedBefore = Cookies.get('hasUploadedBefore')
      
      if (!hasUploadedBefore) {
        Cookies.set('hasUploadedBefore', 'true', { expires: 365 })
        navigate('/thank-you')
      } else {
        navigate('/view')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      setIsLoading(false)
      alert('Upload failed. Please try again.')
    }
  }

  return (
    <motion.div 
      className="upload-process"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Upload Your Photos</h2>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={author} 
        onChange={handleAuthorChange}
        className="author-input"
      />
      <input 
        type="file" 
        multiple 
        accept=".png,.jpg,.jpeg,.webp,.gif,.arw,.cr2,.cr3,.nef,.orf,.raf,.rw2,.dng,.raw"
        onChange={handleFileSelect} 
        className="file-input"
      />
      <motion.button 
        onClick={handleUpload} 
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="upload-button"
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </motion.button>
    </motion.div>
  )
}

export default UploadProcess