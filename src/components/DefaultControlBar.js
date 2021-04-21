import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CurrencySelector from './CurrencySelector'

const DefaultControlBar = () => {
  const user = useSelector( state => state.sessions.user )

  return (
    <>
      <Link to={`/live-rewards/users/${user}/user_stakes/new`}>
        <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
          Add Stake Address
        </button>
        <CurrencySelector/>
      </Link>
    </>
  )
}

export default DefaultControlBar