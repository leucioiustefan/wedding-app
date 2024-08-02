import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// eslint-disable-next-line react/prop-types
const PhotoCarousel = ({ photos }) => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      className="photo-carousel"
    >
      {photos.map((photo,idx) => (
        <div key={idx}>
          <img src={photo} alt={`Photo by Stefan`} />
        </div>
      ))}
    </Carousel>
  )
}

export default PhotoCarousel
