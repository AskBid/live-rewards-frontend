import React from 'react'
// import UserShow from '../containers/UserShow'

function User({history}) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5">
          <h1 className='text-dark'>User</h1>
          <form>
            <button className='h-1 border-0 border-primary rounded-pill mb-5 mt-4 ml-auto mr-auto' 
                style={{width:'60%',display:'block'}} type='Submit'>Logout</button>
          </form>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default User