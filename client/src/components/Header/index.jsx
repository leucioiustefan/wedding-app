import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="app-header">
      <h1>Wedding Memories</h1>
      <nav>
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          {/* <li><Link to="/upload">Upload Photos</Link></li>
          <li><Link to="/view">View Photos</Link></li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header