import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SUCCESS } from '../actions'
import { addUserStake } from '../actions/stake_address.actions'
import { noUserEpochStakes } from '../actions/epoch_stake.actions'
import CurrencySelector from './CurrencySelector'
import styled from 'styled-components'


const AddStakeForm = ({match}) => {

  const [address, setAddress] = useState('')
  const user = useSelector(state => state.sessions.user)
  const dispatch = useDispatch()

  const handleAddressInputChange = (e) => {
    setAddress(state => e.target.value)
  }

  const buttonActivation = () => {
    const correct_address = (address.includes("stake1") || address.includes("addr1")) && (address.length === 59 || address.length === 103)
    return address.length === 0 ? true : correct_address
  }

  const addressChecksMessage = () => {
    if (!address.includes("stake1") && !address.includes("addr1") && address.length > 2) {
      return <div className='alert alert-danger position-absolute'>
          {`The address should start with`} <b>{`"stake1"`}</b> or <b>{`"addr1"`}</b>{`.`}
        </div>
    } else if (address.includes("addr1") && address.length !== 103 && address.length > 5) {
      return <div className='alert alert-info position-absolute'>
          {`The address should be 103 letters long. count: ${address.length}/103`}
        </div>
    } else if (address.includes("stake1") && address.length !== 59 && address.length > 6) {
      return <div className='alert alert-info position-absolute'>
          {`The address should be 59 letters long. count: `}<b>{`${address.length}`}</b>{`/59`}
        </div>
    } else if (address.length < 5 && address.length > 0) {
      return <div className='alert alert-info position-absolute'>
          {`The address is too `}<b>{`short`}</b>{` to be correct.`}
        </div>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      dispatch(addUserStake(user, address))
    } else {
      dispatch(noUserEpochStakes(address))
      dispatch({type: SUCCESS, message: 'You can add only one stake if you are not logged in.'})
    }
  }

  const ButtonAddAddress = styled.button `
    /*background: rgba(255,127,80,0.5);*/
    /*border: 1px solid #4ad9e4;*/
    background: rgba(0, 123, 255, 1);
    border: 1px solid rgba(0, 123, 255, 1);
    color: #fff;
    padding: 0px 2em 0px 2em;
    height: 30px;
    &:hover {
      transition: all 0.05s ease-in-out;
      background: #4ad9e4;
      color: white;
      border: 1px solid transparent;
    }
  `;

  return (
    <>
      <div className='col-lg d-flex flex-wrap justify-content-between mt-2'>
        <form className='w-50 d-inline-flex flex-grow-1 justify-content-center align-items-center m-2' onSubmit={handleSubmit}>
          <fieldset className='flex-grow-1'>
            <input
              type="text"
              name="stake_address"
              placeholder="stake1*** / addr1***   (random if empty)"
              className='h-100 w-100 p-2 border border-primary rounded shadow-sm'
              onChange={handleAddressInputChange}>
            </input>
            <div className='d-flex justify-content-end flex-grow-1'> 
              {addressChecksMessage()}
            </div>
          </fieldset>
          <ButtonAddAddress className='text-nowrap rounded-pill ml-3 shadow-sm h-100'
            type='Submit'
            disabled={!buttonActivation()}
            style={{outline: 'none !important'}}>
            <b>Submit Your Address</b>
          </ButtonAddAddress>
        </form>
        <CurrencySelector/>
        {/*{!user && messageIfNotLoggedIn()}*/}
      </div>
    </>
  )
}

export default AddStakeForm