import React from 'react'
import Navbar from '../navbar/Navbar'

const Unauthorized = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          <h3>You do not have enugh roles to access that page</h3>
        </div>
      </div>
    </>
  )
}

export default Unauthorized