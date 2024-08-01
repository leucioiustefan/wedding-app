import React from 'react'

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={`http://localhost:5000${photo.path}`} alt={photo.title} />
      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p>By: {photo.author}</p>
        {photo.description && <p className="description">{photo.description}</p>}
      </div>
    </div>
  )
}

export default PhotoCard