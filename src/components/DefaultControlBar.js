import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CurrencySelector from './CurrencySelector'

const DefaultControlBar = () => {
  const user = useSelector( state => state.sessions.user )

  return (
    <>
      <Link to={`/live-rewards/users/${user}/user_stakes/new`}>
        <button className='buttonsbar shadow-sm border-0 text-nowrap rounded m-1 mb-0 w-auto' type='Submit'>
          Add Stake Address
        </button>
      </Link>
      <CurrencySelector />
    </>
  )
}

export default DefaultControlBar