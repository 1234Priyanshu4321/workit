import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='page notfound'>
      <div className="content">
        <img src="/notfound-dark.svg" alt="404" style={{ width: "300px", height: "300px", marginBottom: "20px" }} />
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to={'/'}>RETURN TO HOME PAGE</Link>
      </div>
    </section>
  )
}

export default NotFound
