import React, { useEffect } from 'react'
import LoginForm from '../containers/LoginForm'
import Image from '../assets/cardanoscan.png';
import { Link } from 'react-router-dom'
import IntroSchema from '../components/IntroSchema';
import {current_epoch} from '../helpers/epoch_helpers'
import YoutubeEmbed from '../components/YoutubeEmbed'

function Howto({history}) {

  const epochno = current_epoch()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row mb-5">
        <div className='col'></div>
        <div className="col-lg-10 mt-5 mb-5 text-dark">
          <div className="App">
            <h2 className='text-dark'>All you need is a wallet address</h2>
            <br/>
            <p>In this video we show you how to get an address from your <b>Yoroi</b> app and use the <i>Live-Rewards</i> functionality.</p>
            <br/>
            <br/>
            <YoutubeEmbed embedId="3MhCjNFLlWE" />
          </div>
          <br/>
          <br/>
          <p>Your wallet can have many receiving addresses to which ADA can be sent. Those addresses usually start with <b><i>addr1.</i></b></p>
          <p>There is also a unique Stake Address that your wallet uses to delegate to staking pools. This address starts with <b><i>stake1.</i></b></p>

          <p>You can enter any of those, <i>Live-Rewards</i> will show your <b>Cardano</b> delegation and the rewards that you have been gaining in the last 3 epochs.</p>
          <p>Each epoch stake tab has a button that will allow you to compare your delegation with different Pools. With that you can compare your pool performance with that of other pools.</p>
          <br/>
          <br/>
          <p>In the schema below you can see how usually when you send your delegastion to a Pool, it will take you 4/5 epochs to receive your ADA rewards. That can be up to 20 days of waiting! with <i>Live-Rewards</i> you can now know your <b>Cardano</b> rewards as soon as your delegation is active after only 2 epochs.</p>
          <br/>

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
