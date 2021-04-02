import React from 'react'
import { Link } from 'react-router-dom'

const DefaultControlBar = () => {
  return (
    <>
      <Link to='/live-rewards/users/sergio/stake_addresses/edit'>
        <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
          Add Stake Address
        </button>
      </Link>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ₳
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        $
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        €
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        £
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ¥
      </button>
    </>
  )
}

export default DefaultControlBar