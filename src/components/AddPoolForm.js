import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const AddPoolForm = ({addUserStake, match}) => {
  const [address, setAddress] = useState('')

  const handleAddressInputChange = (e) => {
    setAddress(state => e.target.value)
  }

  const buttonActivation = () => {
    const correct_address = address.includes("stake1") && address.length === 59
    return address.length === 0 ? true : correct_address
  }

  const addressChecksMessage = () => {
    if (!address.includes("stake1") && address.length > 6 && !address.includes("addr1")) {
      return <div className='alert alert-info mt-4'>{`The address should start with "stake1".`}</div>
    } else if (address.length !== 59 && !address.includes("addr1") && address.length > 2) {
      return <div className='alert alert-info mt-4'>{`The address should be 59 letters long. count: ${address.length}/59`}</div>
    }
    if (address.includes("addr1") && address.length === 103) {
      return <div className='alert alert-info mt-4'>{`You entered a`}
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
    addUserStake(match.params.username, address)
  }

  return (
    <>
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
          placeholder="stake1ux026n9gx9ygv... (If empty, will pick a random address)"
          className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded'
          onChange={handleAddressInputChange}>
        </input>
      </fieldset>
      <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto'
        type='Submit'
        disabled={!buttonActivation()}>
        Submit Address
      </button>
    </form>
    <div className='d-flex row w-100 justify-content-center'> 
      {addressChecksMessage()}
    </div>
    </>
  )
}

export default AddPoolForm