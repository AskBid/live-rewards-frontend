import React, { Component } from 'react'
import { connect } from "react-redux";
import { getPoolCompareUserEpochStakes } from '../actions/epoch_stake.actions';
import { getEpochStake } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import { groupBy } from 'underscore';

class ProjectedStakesColumn extends Component {

  componentDidMount() {
    if (!this.props.history.location.pathname.includes('/pools/new')) {
      const { username, epoch_stake_id } = this.props.match.params
      !this.props.epoch_stake && 
        getUrlEpochStake(epoch_stake_id)
      !this.props.projected_stakes && 
        this.props.getPoolCompareUserEpochStakes(username, epoch_stake_id)
    }
  }

  getUrlEpochStake = (epoch_stake_id) => {
    epoch_stake = epoch_stakes.filter((epoch_stake) epoch_stake.id === epoch_stake_id)
    !epoch_stake && getEpochStake(epoch_stake_id)
  }

  deployEpochs = () => {
  }

  render() {
    console.log(this.props.epoch_stake)
    console.log(this.props.epoch_stakes)
    console.log(this.props.projected_stakes)
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap">
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
          <div className="m-3 p-5 border rounded bg-white">Epoch Stake </div>                             
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPoolCompareUserEpochStakes: (username, epoch_stake_id) => dispatch(getPoolCompareUserEpochStakes(username, epoch_stake_id))
    getEpochStake: (epoch_stake_id) => dispatch(getEpochStake(epoch_stake_id))
  }
}

const mapStateToProps = store => {
  return {
    epoch_stakes: store.epoch_stakes.list
    epoch_stake: store.epoch_stakes.epoch_stake
    projected_stakes: store.projected_stakes.list
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectedStakesColumn);

