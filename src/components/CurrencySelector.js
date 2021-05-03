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
    console.log(e.target.id)
  }

  return (
    <div className='justify-content-center'>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Currency
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch({type: REQUEST_PRICE_SUCCESS, payload: {symbol: 'ada', price: 1}})}>
            ₳ - ADA Cardano
          </Dropdown.Item>
          <Dropdown.Item id='usd' onClick={switchCurrency}>$ - US Dollar</Dropdown.Item>
          <Dropdown.Item id='eur' onClick={switchCurrency}>€ - Euro</Dropdown.Item>
          <Dropdown.Item id='gbp' onClick={switchCurrency}>£ - Brittish Pound</Dropdown.Item>
          <Dropdown.Item id='jpy' onClick={switchCurrency}>¥ - Japanese Yen</Dropdown.Item>
          <Dropdown.Item disabled>฿ - Bitcoin</Dropdown.Item>
          <Dropdown.Item disabled>Ξ - Ethereum</Dropdown.Item>
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