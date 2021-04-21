import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency )

  return (
    <>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ₳
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        $
      </button>
      {/*<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        €
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        £
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ¥
      </button>*/}
    </>
  )
}

export default CurrencySelector;