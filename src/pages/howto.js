import React, { useEffect } from 'react'
import LoginForm from '../containers/LoginForm'
import Image from '../assets/cardanoscan.png';
import { Link } from 'react-router-dom'
import IntroSchema from '../components/IntroSchema';
import {current_epoch} from '../helpers/epoch_helpers'

function Howto({history}) {

  const epochno = current_epoch()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-6 mt-5 mb-5 text-dark">
          <h2 className='text-dark'>All you need is your Stake Address</h2>
          <br/>
          <p>Your wallet can have many receiving addresses to which ADA can be sent. Those addresses usually start with <i>addr1.</i></p>
          <p>There is also a unique Stake Address that your wallet uses to delegate to staking pools. This address starts with <i>stake1.</i></p>

          <p>To find your Stake Address, get any of your receiveing addresses (starting <i>addr1...</i>) and look it up on <a className='hardlink' href="https://cardanoscan.io/" target="_blank" rel="noreferrer">cardanoscan.io</a>.</p> 
          <p>In the <i>Controlled Stake Section</i>, of the cardanoscan.io page, you will find the BECH32 Stake Address needed to track your Rewards with <Link to={`/live-rewards`} className='hardlink'>Live-Rewards</Link>.</p>
          <br/>
          <div className='container center'>
          <img className='text-center' src={Image} alt="cardanoscan.io stake address location." style={{width:'500px'}}/>
          </div>
          <br/>
          <p>Add your stake address in <Link to={`/live-rewards`} className='hardlink'>Live-Rewards</Link> and magically you'll be able to see the rewards of the last three epochs, including rewards you have not received yet.</p>

          <p>Each epoch stake tab has a button that will allow you to compare your delegation with different Pools. With that you can compare your pool performance with that of other pools.</p>
          <div className="col-sm mt-3 mb-5">
            <IntroSchema 
              opacity={'40%'} 
              current_epoch={epochno} 
              epochno={epochno+2} 
              textRight={'Rewards Delivery'} 
              colorRight={'danger'}/>
            <IntroSchema 
              opacity={'70%'} 
              current_epoch={epochno} 
              epochno={epochno+1} 
              textRight={'Calculating Rewards'} 
              colorRight={'danger'}/>
            <IntroSchema 
              opacity={'100%'} 
              current_epoch={epochno} 
              epochno={epochno} 
              textLeft={'check your rewards live!'} 
              colorLeft={'highlight'} 
              textRight={'Active Delegation'} 
              colorRight={'primary'}/>
            <IntroSchema 
              opacity={'100%'} 
              current_epoch={epochno} 
              epochno={epochno-1} 
              textRight={'Stakes Snapshot'} 
              colorRight={'primary'}/>
            <IntroSchema 
              opacity={'100%'} 
              current_epoch={epochno} 
              epochno={epochno-2} 
              textRight={'Sent Delegation'} 
              colorRight={'primary'}/>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Howto
