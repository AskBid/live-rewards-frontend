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
    </div>
  )
}

export default CurrencySelector;