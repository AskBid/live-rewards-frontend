import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CurrencySelector from './CurrencySelector'

const DefaultControlBar = () => {
  const user = useSelector( state => state.sessions.user )

  const messageIfNotLoggedIn = () => {
    return (
    <div className='mt-3 ml-5' style={{fontSize:'0.9em', opacity:'60%'}}>
      <Link to={`/login`} className='hardlink'>Login</Link>
      {' '}or{' '}
      <Link to={`/signup`} className='hardlink'>Register</Link>
      {' '}for full functionalities.
    </div>)
  }

  return (
    <>
      <Link to={`/live-rewards/users/${user}/user_stakes/new`}>
        <button className='buttonsbar shadow-sm border-0 text-nowrap rounded m-1 mb-0 w-auto' type='Submit'>
          Add Your Stake Address
        </button>
      </Link>
      <CurrencySelector />
      {!user && messageIfNotLoggedIn()}
    </>
  )
}

export default DefaultControlBar