import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"
import AddStakeForm from '../components/AddStakeForm'
import DefaultControlBar from '../components/DefaultControlBar'
import { addUserStake } from '../actions/stake_address.actions'

class PoolCompareControlBar extends Component {
  
  render() { return (
  	<div className='row mt-4 mb-5 mr-auto ml-auto'>
  		<Switch>
  			<Route path={`/pool-compare/users/:username/user_stakes/new`} 
          render={(props) => <AddStakeForm {...props} addUserStake={this.props.addUserStake}/>} />
		  	<Route path='/pool-compare'>
		  		<DefaultControlBar/>
		  	</Route>
  		</Switch>
  	</div>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    addUserStake: (user, address) => dispatch(addUserStake(user, address))
  }
}

export default connect(null, mapDispatchToProps)(PoolCompareControlBar)