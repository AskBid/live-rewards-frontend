import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import StakeTab from '../components/StakeTab';
import _ , { groupBy } from 'underscore';

class StakesColumn extends Component {

  componentDidMount() {
    this.props.userEpochStakes(this.props.username)
      .then((res) => {
      }).catch((err) => console.log(err))
  }

  deployEpochs = () => {
    console.log(_.groupBy(this.props.epoch_stakes, 'epoch_no'))
    // return this.props.epoch_stakes.map(epochno => <StakeTab key={epochno} epochno={epochno} />)
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

