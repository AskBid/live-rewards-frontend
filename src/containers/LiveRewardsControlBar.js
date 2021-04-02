import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import AddStakeForm from '../components/AddStakeForm'
import DefaultControlBar from '../components/DefaultControlBar'

function LiveRewardsControlBar() {
  return (
  	<div className='row mt-4 mb-3 mr-auto ml-auto'>
  		<Switch>
  			<Route path={`/live-rewards/users/:username/stake_addresses/edit`}>
  				<AddStakeForm/>
  			</Route>
		  	<Route path='/live-rewards'>
		  		<DefaultControlBar/>
		  	</Route>
  		</Switch>
  	</div>
  )
}

export default LiveRewardsControlBar