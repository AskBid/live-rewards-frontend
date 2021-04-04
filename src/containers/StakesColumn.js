import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import StakeTab from '../components/StakeTab';
import { groupBy } from 'underscore';

class StakesColumn extends Component {

  componentDidMount() {
    this.props.userEpochStakes(this.props.username)
      .then((res) => {
      }).catch((err) => console.log(err))
  }

  deployEpochs = () => {
    const epoch_stakes_by_epoch = groupBy(this.props.epoch_stakes, 'epoch_no')
    const ordered_keys = Object.keys(epoch_stakes_by_epoch)
      .map(str => parseInt(str))
      .sort((a,b) => a + b)
      .reverse()
    return ordered_keys.map(epochno => {
      return <StakeTab key={epochno} epochno={epochno} stakes={epoch_stakes_by_epoch[epochno]} />
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.deployEpochs()}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userEpochStakes: (username) => dispatch(userEpochStakes(username))
  }
}

const mapStateToProps = store => {
  return {
    username: store.sessions.user,
    epoch_stakes: store.epoch_stakes.epoch_stakes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StakesColumn);

