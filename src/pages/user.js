import React from 'react'
import UserShow from '../containers/UserShow'

function User({history}) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5">
          <UserShow />
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default User