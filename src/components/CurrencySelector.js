import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPrice } from '../actions/session.actions'
import { REQUEST_PRICE_SUCCESS } from '../actions'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import numeral from 'numeral'

const CurrencySelector = () => {
  const currency = useSelector( state => state.sessions.currency )
  const loading = useSelector( state => state.sessions.gecko_loading )
  const dispatch = useDispatch()

  const switchCurrency = (e) => {
    dispatch(getPrice(e.target.id))
  }

  const symbols = {
    ada: '₳',
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    btc: '฿'
  }

  const PriceDisplay = styled.div `
    /*background: rgba(255,127,80,0.5);*/
    background: rgba(255,255,255,0.5);
    border: 2px solid #007bff;
    color: #007bff;
    min-width: 100px;
    &:hover {
      transition: all 0.05s ease-in-out;
    }
  `;
  console.log(loading)
  return (
    <div className='col-sm d-flex flex-inline flex-grow-1 justify-content-end m-2'>
      <PriceDisplay className='ml-2 mr-2 h-100 text-monospace shadow-sm rounded d-flex justify-content-center align-items-center'>
        <SkeletonTheme color="rgba(0, 123, 255, 0.65)" highlightColor="rgba(40, 173, 255, 0.45)">
          <h5 className='pl-2 pr-2 m-0 text-nowrap text-monospace'>
            {loading ? <Skeleton  style={{minWidth:"50px"}}/> : (currency.symbol != 'ada' ? `${symbols[currency.symbol]}${numeral(currency.price).format('0,0.00')}` : '₳D₳')}
          </h5>
        </SkeletonTheme>
      </PriceDisplay>
      <Dropdown className='shadow-sm'>
        <Dropdown.Toggle id="dropdown-basic">
          Change Currency
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