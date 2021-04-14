import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';

const dummyEpochByEpoch = {
	amount: "202191508754.0",
	blocks: 4,
	calc_rewards: 94.111817,
	epoch_no: 257,
	estimated_blocks: "5.3185119842713605021509897235538613149053606711327384",
	id: 6800125,
	pool_hash: {
		id: 1262,
		pool: {id: 3187, ticker: "LUNA", url: "https://luna-pool.com/pool_metadata.json"},
		view: "pool1kffetqjt06qvk4995tz3e3q9h3c8cdq9eedrz8qr3ynnc63qckz"
	},
	stake_address: {
		id: 308988,
		view: "stake1u9surjtv2y3w08fznpkhmfnlpd9at0ej9n9rt860zskz9ss3uhjtj"
	}
}

const DummyEpochTab = ({epochno, stakes, buttonsOff}) => {
  return (
  	<div style={{opacity:'50%'}}>
  		<h4 className='text-muted text-center'>Dummy sample:</h4>
			<EpochTab key={259} epochno={259} stakes={[dummyEpochByEpoch]} buttonsOff={true}/>
		</div>
	)
}

export default DummyEpochTab;