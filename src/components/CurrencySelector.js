import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPrice } from '../actions/session.actions'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency )
  const dispatch = useDispatch()

  const switchCurrency = (e) => {
    console.log(e.target.id)
    dispatch(getPrice(e.target.id))
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