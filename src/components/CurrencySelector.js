import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency )

  const switchCurrency = (e) => {
    // e.preventDefault()
    console.log(e.target.id)
  }

  return (
    <>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency} 
        id='ada'>
        ₳
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='usd'>
        $
      </button>
      {/* €£¥ */}
    </>
  )
}

export default CurrencySelector;