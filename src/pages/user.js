import React, { useEffect } from 'react'
import UserShow from '../containers/UserShow'

function User({history}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5">
          <UserShow history={history}/>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default User