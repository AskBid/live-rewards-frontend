import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPrice } from '../actions/session.actions'
import { REQUEST_PRICE_SUCCESS } from '../actions'
import Dropdown from 'react-bootstrap/Dropdown'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency.symbol )
  const dispatch = useDispatch()

  const switchCurrency = (e) => {
    dispatch(getPrice(e.target.id))
    console.log(currency)
  }

  return (
    <div className='justify-content-center'>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/*<button 
        className={`${currency === 'ada' ? 'selected-currency' : null} buttonsbar shadow-sm border-0 text-nowrap rounded-pill m-1`}
        onClick={() => dispatch({type: REQUEST_PRICE_SUCCESS, payload: {symbol: 'ada', price: 1}})}
        id='ada'>
        ₳
      </button>
      <button 
        className={`${currency === 'usd' ? 'selected-currency' : null} buttonsbar shadow-sm border-0 text-nowrap rounded-pill m-1`}
        onClick={switchCurrency}
        id='usd'>
        $
      </button>
      <button 
        className={`${currency === 'eur' ? 'selected-currency' : null} buttonsbar shadow-sm border-0 text-nowrap rounded-pill m-1`}
        onClick={switchCurrency}
        id='eur'>
        €
      </button>
      <button 
        className={`${currency === 'gbp' ? 'selected-currency' : null} buttonsbar shadow-sm border-0 text-nowrap rounded-pill m-1`}
        onClick={switchCurrency}
        id='gbp'>
        £
      </button>
      <button 
        className={`${currency === 'jpy' ? 'selected-currency' : null} buttonsbar shadow-sm border-0 text-nowrap rounded-pill m-1`}
        onClick={switchCurrency}
        id='jpy'>
        ¥
      </button>
      <button 
        className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto'
        onClick={switchCurrency}
        id='btc'>
        ฿
      </button>*/}
    </div>
  )
}

export default CurrencySelector;