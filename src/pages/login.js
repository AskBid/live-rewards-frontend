import React from 'react'
import LoginForm from '../containers/LoginForm'

function Login({history}) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5">
          <LoginForm history={history}/>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Login
