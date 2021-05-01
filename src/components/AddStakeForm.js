import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SUCCESS } from '../actions'
import CurrencySelector from './CurrencySelector'


const AddStakeForm = ({addUserStake, match, user, unregisteredEpochStakes}) => {

  const [address, setAddress] = useState('')
  const dispatch = useDispatch()

  const handleAddressInputChange = (e) => {
    setAddress(state => e.target.value)
  }

  const buttonActivation = () => {
    const correct_address = address.includes("stake1") && address.length === 59
    return address.length === 0 ? true : correct_address
  }

  const addressChecksMessage = () => {
    if (!address.includes("stake1") && address.length > 6 && !address.includes("addr1")) {
      return <div className='alert alert-info mt-4 position-absolute'>{`The address should start with "stake1".`}</div>
    } else if (address.length !== 59 && !address.includes("addr1") && address.length > 2) {
      return <div className='alert alert-info mt-4 position-absolute'>{`The address should be 59 letters long. count: ${address.length}/59`}</div>
    }
    if (address.includes("addr1") && address.length === 103) {
      return <div className='alert alert-info mt-4 position-absolute'>{`You entered a`}
            <b>{` Wallet Address`}</b>
            {`, to find its BECH32 `}<b>{`Stake Address`}</b>{` visit: `}<br/>
          <a href={`https://cardanoscan.io/address/${address}`} target="_blank" rel="noreferrer">
            {`https://cardanoscan.io/address/${address.slice(0,18)}...`}
          </a>
        </div>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      addUserStake(user, address)
    } else {
      unregisteredEpochStakes(address)
      dispatch({type: SUCCESS, message: 'You can add only one stake if you are not logged in.'})
    }
  }

  return (
    <>
      <div className='d-flex flex-wrap justify-content-between w-100'>
        <form className='d-inline-flex flex-grow-1' onSubmit={handleSubmit}>
          <fieldset className='flex-grow-1 pt-1 pb-1'>
            <input
              type="text"
              name="stake_address"
              placeholder="stake1ux026n9gx9ygv...       (random if empty)"
              className='h-100 w-100 p-2 border border-primary rounded shadow-sm'
              onChange={handleAddressInputChange}
              style={{minWidth:'100px'}}>
            </input>
          </fieldset>
          <button className='border-0 text-nowrap rounded-pill ml-1 mr-5 shadow-sm'
            type='Submit'
            disabled={!buttonActivation()}
            style={{outline: 'none !important'}}>
            Submit Address
          </button>
        </form>
        <CurrencySelector/>
        {/*{!user && messageIfNotLoggedIn()}*/}
      </div>
      <div className='d-flex row w-100 justify-content-center'> 
        {addressChecksMessage()}
      </div>
    </>
  )
}

export default AddStakeForm