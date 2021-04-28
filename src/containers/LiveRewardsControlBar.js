import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import AddStakeForm from '../components/AddStakeForm'
import DefaultControlBar from '../components/DefaultControlBar'
import { addUserStake } from '../actions/stake_address.actions'
import { unregisteredEpochStakes } from '../actions/epoch_stake.actions'

class LiveRewardsControlBar extends Component {
  
  render() { 
    return (
    	<div className='row mt-4 mr-auto ml-auto'>
        {this.props.epoch_stakes.length === 0 
          ?
          <Route path={`/live-rewards`} render={(props) => <AddStakeForm {...this.props} {...props} hideHide={true}/>} />
          :
      		<Switch>
      			<Route path={`/live-rewards/users/:username/user_stakes/new`} 
              render={(props) => <AddStakeForm {...this.props} {...props}/>} />
    		  	<Route path='/live-rewards'>
    		  		<DefaultControlBar/>
    		  	</Route>
      		</Switch>
        }
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
    user: state.sessions.user,
    epoch_stakes: state.epoch_stakes.list
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveRewardsControlBar)