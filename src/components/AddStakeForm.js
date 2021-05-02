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
    const correct_address = (address.includes("stake1") || address.includes("addr1")) && (address.length === 59 || address.length === 103)
    return address.length === 0 ? true : correct_address
  }

  const addressChecksMessage = () => {
    if (!address.includes("stake1") && !address.includes("addr1") && address.length > 2) {
      return <div className='alert alert-info position-absolute'>
          {`The address should start with`} <b>{`"stake1"`}</b> or <b>{`"addr1"`}</b>{`.`}
        </div>
    } else if (address.includes("addr1") && address.length !== 103 && address.length > 5) {
      return <div className='alert alert-info position-absolute'>
          {`The address should be 103 letters long. count: ${address.length}/103`}
        </div>
    } else if (address.includes("stake1") && address.length !== 59 && address.length > 6) {
      return <div className='alert alert-info position-absolute'>
          {`The address should be 59 letters long. count: ${address.length}/59`}
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
              placeholder="stake1*** or addr1***   (random if empty)"
              className='h-100 w-100 p-2 border border-primary rounded shadow-sm'
              onChange={handleAddressInputChange}
              style={{minWidth:'100px'}}>
            </input>
            <div className='d-flex justify-content-center flex-grow-1'> 
              {addressChecksMessage()}
            </div>
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
    </>
  )
}

export default AddStakeForm