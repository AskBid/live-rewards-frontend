import React, { Component } from 'react'
import { connect } from "react-redux";
import { getPoolCompareUserEpochStakes } from '../actions/pool_compared_stake.actions';
import { getEpochStake } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import StakeTab from '../components/StakeTab';
import { withRouter, Link } from "react-router-dom";

class PoolComparedStakesColumn extends Component {

  componentDidMount() {
    const { username, epoch_stake_id } = this.props.match.params
    this.props.epoch_stakes.filter((epoch_stake) => epoch_stake.id == epoch_stake_id)[0] || this.props.getEpochStake(epoch_stake_id)
    // this.props.getPoolCompareUserEpochStakes(username, epoch_stake_id)
  }

  deployProjectedEpochStakes = () => {
    return (
      <>
        {this.props.pool_compared_stakes.map((stake) => {
          return (
            <div className='text-light bg-white bg-gradient pt-3 pb-0 shadow-sm mb-0' style={{borderRadius:'10px', margin:'12px 0px 0px 0px'}}>
              <div className='d-flex flex-lg-row flex-wrap'>
                <div className='container col pb-3 pt-0 pl-0 pr-0 align-self-center'>
                  <div className='container align-self-center mt-auto mb-auto ml-auto mr-auto d-flex flex-row'>
                    Delegating with <b>{stake.pool_hash.pool.ticker} </b> 
                    rather than <b>{this.props.epoch_stake.pool_hash.pool.ticker}</b>
                  </div>
                </div>
                <div className='col flex-grow-1 d-flex flex-row flex-wrap'>
                  <StakeTab stake={stake}/>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  textIfEmpty = () => {
    if (this.props.loading_compared_stakes) {
      return (
         <h2 className='text-muted m-5'>Loading...</h2>
      )
    } else if (this.props.pool_compared_stakes.length === 0) {
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
          <div className={`w-100 d-flex justify-content-center`} onClick={this.props.closeAlert} style={{cursor:'pointer'}}>
            <div className={`alert ${this.props.alert.type} w-75`}>
              <b>{this.props.alert.message}</b>
            </div>
          </div>
        }
        <div className='d-flex justify-content-center'>
        </div>
        {epoch_stake && <EpochTab epochno={epoch_stake.epoch_no} stakes={[epoch_stake]}/>}
        {this.textIfEmpty()}
        {this.deployProjectedEpochStakes()}
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
    alert: store.alert
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PoolComparedStakesColumn));

