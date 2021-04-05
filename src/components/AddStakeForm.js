import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const AddStakeForm = ({addUserStake, match}) => {
  const [{address}, setAddress] = useState({address: ''})

  const handleAddressInputChange = (e) => setAddress(state => ({address: e.target.value}))

  const handleSubmit = (e) => {
    e.preventDefault()
    addUserStake(match.params.username, {stake_address: address})
      .then((res) => {debugger})
  }

  return (
    <form className='row d-inline-flex w-100 mr-auto ml-auto' onSubmit={handleSubmit}>
      <Link to='/live-rewards' className=''>
        <button className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1' type='Submit'>
          Hide
        </button>
      </Link>
      <fieldset className='col w-100 d-inline-flex p-0 pl-2'>
        <input
          type="text"
          name="stake_address"
          placeholder="e.g. stake1ux026n9gx9ygv... (If empty, will pick a random address)"
          className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded'
          onChange={handleAddressInputChange}>
        </input>
      </fieldset>
      <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto' type='Submit'>
        Submit Address
      </button>
    </form>
  )
}

export default AddStakeForm