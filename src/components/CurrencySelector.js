import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPrice } from '../actions/session.actions'
import { REQUEST_PRICE_SUCCESS } from '../actions'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency.symbol )
  const dispatch = useDispatch()

  const switchCurrency = (e) => {
    dispatch(getPrice(e.target.id))
    console.log(e.target.id)
  }

  const PriceDisplay = styled.div `
    /*background: rgba(255,127,80,0.5);*/
    background: rgba(255,255,255,0.5);
    border: 2px solid #4ad9e4;
    color: #fff;
    min-width: 100px;
    &:hover {
      transition: all 0.05s ease-in-out;
    }
  `;

  return (
    <div className='d-flex flex-inline justify-content-center m-2'>
      <PriceDisplay className='ml-2 mr-2 h-100 rounded d-flex justify-content-center align-items-center'>
        <h5 className='p-0 m-0'>₳ = 1₳</h5>
      </PriceDisplay>
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