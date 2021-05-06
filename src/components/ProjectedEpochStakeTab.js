import React, { useState } from 'react'
import styled from 'styled-components';
import numeral from 'numeral';
import StakeTab from '../components/StakeTab';
import { useSelector, useDispatch } from 'react-redux'
import { deleteLocalStoragePoolHash } from '../actions/pool_compared_stake.actions';
import { deleteUserPoolHash } from '../actions/pool_compared_stake.actions';

const UnfollowLink = styled.div `
  background: none;
  border: none;
  color: rgba(220, 53, 69, 0.5);
  cursor: pointer;
  font-size: 0.9em;
  &:hover {
    color: rgba(220, 53, 69, 1);
    background: rgba(220, 53, 69, 0.08);
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.05s ease-in-out;
  }
`;

const ProjectedEpochStakeTab = ({stake, epoch_stake}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.sessions.user)
  const price = useSelector(state => state.sessions.currency.price)
  const currency = useSelector(state => state.sessions.currency.symbol)
  const difference = (stake.calc_rewards * price) - (epoch_stake.calc_rewards * price)
  const color = difference < 0 ? 'danger' : 'primary'

  const symbols = {
    ada: '₳',
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    btc: '฿'
  }

  const unfollowPool = () => {
    !user && dispatch(deleteLocalStoragePoolHash(stake.pool_hash))
    user && dispatch(deleteUserPoolHash(user, stake.pool_hash.id))
  }

  return (
    <div className='text-light bg-white bg-gradient pt-1 pb-0 shadow-sm mb-0' style={{borderRadius:'10px', margin:'12px 0px 0px 0px'}}>
       <UnfollowLink className='pl-4 mb-2 ml-5 mr-5 text-center' onClick={unfollowPool}>
        <u>Unfollow {/*<i>{stake.pool_hash.pool.ticker}</i>*/}</u>
      </UnfollowLink>
      <div className='d-flex flex-wrap'>
        <div className='container col pb-3 pt-0 pl-0 pr-0 align-self-center'>
          <div className='container w-100 text-nowrap text-primary text-center mt-auto mb-auto ml-auto mr-auto d-flex align-self-center flex-column'>
            <p className='mb-0'>Delegating with <b>{stake.pool_hash.pool.ticker}</b> rather than <b>{epoch_stake.pool_hash.pool.ticker}</b>.</p>
            <p className='mb-0'><i>estimated</i> rewards difference:</p>
            <p className={`border border-${color} text-${color} pt-2 pb-2 mt-3 mb-4 align-self-center text-white text-monospace rounded w-50`} style={{opacity:'60%'}}>
              {difference > 0 ? '+' : '' }
              {
                difference < 100 ? 
                numeral(difference).format('0,0.0') : 
                numeral(difference).format('0,0')}{symbols[currency]
              }
            </p>
          </div>
          
        </div>
        <div className='col flex-grow-1 d-flex flex-row flex-wrap'>
          <StakeTab stake={stake} buttonType={2}/>
        </div>
      </div>
    </div>
  )
}

export default ProjectedEpochStakeTab

