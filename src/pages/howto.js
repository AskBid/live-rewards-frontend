import React from 'react'
import LoginForm from '../containers/LoginForm'
import Image from '../assets/cardanoscan.png';
import { Link } from 'react-router-dom'

function Howto({history}) {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5 mb-5 text-dark">
          <h2 className='text-dark'>All you need is your Stake Address</h2>
          <br/>
          <p>Your wallet can have many receiving addresses to which you can receive ADA. Those addresses usually start with <i>addr1.</i></p>
          <p>There is also a unique Stake Address that your wallet uses to delegate to a staking pool. This address starts with <i>stake1.</i></p>

          <p>To find your Stake Address, get any of your receiveing addresses (starting <i>addr1...</i>) and look it up on <a className='hardlink' href="https://cardanoscan.io/" target="_blank" rel="noreferrer">cardanoscan.io</a>.</p> <p>In the <i>Controlled Stake Section</i> you will find the BECH32 Stake Address that you need to see your Rewards in <Link to={`/live-rewards`} className='hardlink'>Live-Rewards</Link>.</p>
          <br/>
          <div className='container center'>
          <img className='text-center' src={Image} alt="cardanoscan.io stake address location." style={{width:'500px'}}/>
          </div>
          <br/>
          <p>Add your stake address in the <Link to={`/live-rewards`} className='hardlink'>Live-Rewards</Link> section and magically you'll be able to see the rewards of the current epoch and the two previous epochs.</p>

          <p>Each delegation has a button that will allow you to compare your delegation with different Pools. So that you can compare the reward performance of your pool of choice.</p>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Howto
