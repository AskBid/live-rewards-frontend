import React from 'react'
import { Link } from 'react-router-dom'

const UserButton = () => {
  return (
    <Link to='/'>
      <button className='col buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-auto mb-auto' type='Submit'>
        @sergio
      </button>
    </Link>
  )
}

export default UserButton