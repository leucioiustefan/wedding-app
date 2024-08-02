import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PhotoCarousel from '../PhotoCarousel';
import img1 from '../../images/slideshow1.jpeg';
import img2 from '../../images/slideshow2.jpg';
import img3 from '../../images/slideshow3.jpg';
import img4 from '../../images/slideshow4.jpg';


const LandingPage = () => {
  const navigate = useNavigate()
  const recentPhotos = [img1, img2, img3, img4];

  return (
    <motion.div 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        Upload and share your wedding memories with us
      </motion.h2>
      <motion.button 
        onClick={() => navigate('/upload')} 
        className="cta-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Uploading
      </motion.button>
      {recentPhotos.length > 0 && (
        <motion.div 
          className="recent-photos"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <PhotoCarousel photos={recentPhotos} />
        </motion.div>
      )}
    </motion.div>
  )
}

export default LandingPage