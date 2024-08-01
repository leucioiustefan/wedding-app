import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ThankYouPage = () => {
  const navigate = useNavigate()

  
  return (
    <motion.div 
      className="thank-you-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
      style= {{ textAlign: 'center' }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Thank You!
      </motion.h1>
      
      <motion.button 
        onClick={() => navigate('/upload')}
        className="cta-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Upload more photos
      </motion.button>
    </motion.div>
  )
}

export default ThankYouPage