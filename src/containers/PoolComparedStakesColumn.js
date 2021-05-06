import React, { Component } from 'react'
import { connect } from "react-redux";
import { getPoolCompareUserEpochStakes } from '../actions/pool_compared_stake.actions';
import { getEpochStake } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import { withRouter, Link } from "react-router-dom";
import { REQUEST_EPOCH_STAKE_SUCCESS } from '../actions';
import BeatLoader from "react-spinners/BeatLoader";
import ProjectedEpochStakeTab from '../components/ProjectedEpochStakeTab'

class PoolComparedStakesColumn extends Component {

  componentDidMount() {
    const { epoch_stake_id } = this.props.match.params
    const epoch_stake = this.props.epoch_stakes.filter((epoch_stake) => epoch_stake.id == epoch_stake_id)[0]
    if (epoch_stake) {
      this.props.reuseEpochStake(epoch_stake)
    } else {
      this.props.getEpochStake(epoch_stake_id)
    }// this.props.getPoolCompareUserEpochStakes(username, epoch_stake_id)
  }

  textIfEmpty = () => {
    if (this.props.pool_compared_stakes.length === 0) {
      return (
        <p className='text-muted m-5'>
          You are not following any pools.<br/>
          To compare your stake with other pools, follow a pool by using the form on top of the page.
        </p>
      )
    }
  }

  render() {
    const epoch_stake = this.props.epoch_stake

    return (
      <React.Fragment>
        { this.props.alert.message &&
          <div className={`position-absolute w-100 d-flex justify-content-center`} onClick={this.props.closeAlert} style={{cursor:'pointer'}}>
            <div className={`alert ${this.props.alert.type} w-75`}>
              {this.props.alert.message}
            </div>
          </div>
        }
        {epoch_stake && <EpochTab epochno={epoch_stake.epoch_no} stakes={[epoch_stake]} buttonType={0}/>}
        {
          this.props.loading_compared_stakes && 
          <div className='position-fixed w-100 text-center'>
            <BeatLoader className='position-fixed w-100 h-100 text-center' color='#999' size={30} style={{zIndex:'100'}}/>
          </div>
        }
        {this.textIfEmpty()}
        {this.props.pool_compared_stakes.map(stake => <ProjectedEpochStakeTab stake={stake} epoch_stake={epoch_stake} />)}
        <div style={{minHeight:'100px'}}></div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPoolCompareUserEpochStakes: (username, epoch_stake_id) => {
      return dispatch(getPoolCompareUserEpochStakes(username, epoch_stake_id))
    },
    getEpochStake: (epoch_stake_id) => dispatch(getEpochStake(epoch_stake_id)),
    reuseEpochStake: (epoch_stake) => dispatch({type: REQUEST_EPOCH_STAKE_SUCCESS, payload: epoch_stake}),
    closeAlert: () => dispatch({type: 'ALERT_CLEAR'})
  }
}

const mapStateToProps = store => {
  return {
    epoch_stakes: store.epoch_stakes.list,
    epoch_stake: store.epoch_stakes.epoch_stake,
    pool_compared_stakes: store.pool_compared_stakes.list,
    loading: store.epoch_stakes.loading,
    loading_compared_stakes: store.pool_compared_stakes.loading,
    alert: store.alert,
    user: store.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PoolComparedStakesColumn));

