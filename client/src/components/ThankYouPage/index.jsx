import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'

const ThankYouPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if the user has already seen the thank you page
    const hasUploadedBefore = Cookies.get('hasUploadedBefore')
    if (hasUploadedBefore) {
      // If they have, redirect to the album page
      navigate('/view')
    }
  }, [navigate])

  return (
    <motion.div 
      className="thank-you-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Thank You!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        We're grateful for your presence at our wedding and for sharing your memories with us.
        Your photos will be cherished for years to come. We wish you all the best!
      </motion.p>
      <motion.button 
        onClick={() => navigate('/view')}
        className="cta-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Wedding Album
      </motion.button>
    </motion.div>
  )
}

export default ThankYouPage