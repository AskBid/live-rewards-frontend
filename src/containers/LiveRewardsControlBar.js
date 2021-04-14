import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"
import AddStakeForm from '../components/AddStakeForm'
import DefaultControlBar from '../components/DefaultControlBar'
import { addUserStake } from '../actions/stake_address.actions'
import { unregisteredEpochStakes } from '../actions/epoch_stake.actions'

class LiveRewardsControlBar extends Component {
  
  render() { 
    return (
    	<div className='row mt-4 mb-5 mr-auto ml-auto'>
    		<Switch>
    			<Route path={`/live-rewards/users/:username/user_stakes/new`} 
            render={(props) => <AddStakeForm {...this.props} {...props}/>} />
  		  	<Route path='/live-rewards'>
  		  		<DefaultControlBar/>
  		  	</Route>
    		</Switch>
    	</div>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    addUserStake: (user, address) => dispatch(addUserStake(user, address)),
    unregisteredEpochStakes: (stake_address) => dispatch(unregisteredEpochStakes(stake_address))
  }
}

const mapStateToProps = state => {
  return {
    user: state.sessions.user
  }
}

export default connect(null, mapDispatchToProps)(LiveRewardsControlBar)