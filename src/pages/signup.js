import React from 'react'
import NewUserForm from '../containers/NewUserForm'

function Signup() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className='col'></div>
          <div className="col-6  mt-5">
            <NewUserForm />
          </div>
          <div className='col'></div>
        </div>
      </div>
    )
}

export default Signup