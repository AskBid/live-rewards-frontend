import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPrice } from '../actions/session.actions'
import { REQUEST_PRICE_SUCCESS } from '../actions'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency )
  const dispatch = useDispatch()

  const switchCurrency = (e) => {
    dispatch(getPrice(e.target.id))
  }

  return (
    <>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={() => dispatch({type: REQUEST_PRICE_SUCCESS, payload: {ada: 1}})}
        id='ada'>
        ₳
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='usd'>
        $
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='eur'>
        €
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='gbp'>
        £
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='jpy'>
        ¥
      </button>
      {/*<button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='btc'>
        ฿
      </button>*/}
    </>
  )
}

export default CurrencySelector;