import React from 'react'
import { Link } from 'react-router-dom'

const AddStakeForm = () => {
  return (
    <form className='row d-inline-flex w-100 mr-auto ml-auto'>
      <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto' type='Submit'>
        Submit Address
      </button>
      <fieldset className='col w-100 d-inline-flex p-0'>
        <input
          type="text"
          name="stake_address"
          placeholder="e.g. stake1ux026n9gx9ygv... (If empty, will pick a random address)"
          className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded'>
        </input>
      </fieldset>
      <Link to='/live-rewards'>
        <button className='col buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-auto mb-auto' type='Submit'>
          Hide
        </button>
      </Link>
    </form>
  )
}

export default AddStakeForm