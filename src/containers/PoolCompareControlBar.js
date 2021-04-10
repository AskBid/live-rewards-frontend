import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"
import AddPoolForm from './AddPoolForm'
import DefaultPoolControlBar from '../components/DefaultPoolControlBar'
import { addUserStake } from '../actions/stake_address.actions'

class PoolCompareControlBar extends Component {
  
  render() { return (
  	<div className='row mt-4 mb-5 mr-auto ml-auto'>
  		<Switch>
  			<Route path={`/pool-compare/users/:username/pools/new`} 
          render={(props) => <AddPoolForm {...props} />} />
		  	<Route path='/pool-compare/users/:username/epoch_stakes/'>
		  		<DefaultPoolControlBar/>
		  	</Route>
  		</Switch>
  	</div>
  )}
}

export default connect(null)(PoolCompareControlBar)