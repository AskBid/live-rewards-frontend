  
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SUCCESS } from '../actions'
import CurrencySelector from './CurrencySelector'


const StakeTabButtons = ({addUserStake, match, user, unregisteredEpochStakes}) => {
  const stakeTabButtons = () => {
    return (
      <React.Fragment>
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch(deleteStakeAddress(user, stake.stake_address.id))
          }}>
            <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
              <CloseIcon /> 
            </DeleteBtn>
          </form>

          <OverlayTrigger placement='top' overlay={compareTip}>
            <Link to={`/pool-compare/users/${user}/epoch_stakes/${stake.id}`}>
              <PoolBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto' style={{width:'2.3vw'}}>
                <PoolIcon size={23}/> 
              </PoolBtn>
            </Link>
          </OverlayTrigger>

          <OverlayTrigger placement='top' overlay={delegationFlowTip}>
            <Link to={`/delegation-flows/epochs/${stake.epoch_no}/pools/${stake.pool_hash.pool.ticker}`}>
              <DeleFlowBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2.3vw'}}>
                <DeleFlowIcon size={23}/>
              </DeleFlowBtn>
            </Link>
          </OverlayTrigger>
      </React.Fragment>
    )
  }

  const compareTabButtons = () => {
    return (
      <React.Fragment>
        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(deleteUserPoolHash(stake.user_pool_hash_id))
        }}>
          <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
            <CloseIcon /> 
          </DeleteBtn>
        </form>
      </React.Fragment>
    )
  }

  const unregisteredTabButtons = () => {
    return (
      <React.Fragment>
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch({type: CLEAR_EPOCH_STAKES})
            dispatch({type: CLEAR})
          }}>
            <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
              <CloseIcon />
            </DeleteBtn>
          </form>

          <OverlayTrigger placement='top' overlay={compareTip}>
            <PoolBtn onClick={() => dispatch({type: ERROR, message: 'Pool Compare functionality is only available if you Login.'})} className='mt-auto p-0 mb-auto h-100 ml-auto' style={{width:'2.3vw'}}>
              <PoolIcon size={25}/> 
            </PoolBtn>
          </OverlayTrigger>

          <OverlayTrigger placement='top' overlay={delegationFlowTip}>
            <Link to={`/delegation-flows/epochs/${stake.epoch_no}/pools/${stake.pool_hash.pool.ticker}`}>
              <DeleFlowBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2.3vw'}}>
                <DeleFlowIcon size={23}/>
              </DeleFlowBtn>
            </Link>
          </OverlayTrigger>
      </React.Fragment>
    )
  }

  const whichButtons = () => {
    switch (tabType) {
      case 'live-rewards':
        return stakeTabButtons()
      case 'pool-compare':
        return compareTabButtons()
      case 'live-rewards-unregistered':
        return unregisteredTabButtons()
      default:
        return <div style={{width:'1.2em'}}></div>
    }
  }