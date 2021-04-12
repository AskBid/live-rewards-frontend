import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DefaultPoolControlBar = () => {
  const user = useSelector( state => state.sessions.user )

  return (
    <>
      <Link to={`/pool-compare/users/${user}/pools/new`}>
        <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
          Add Pool to Compare
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

export default DefaultPoolControlBar