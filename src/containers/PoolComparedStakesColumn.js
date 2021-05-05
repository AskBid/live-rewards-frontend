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
      <div className="d-flex flex-wrap">
        {this.props.pool_compared_stakes.map((stake) => <StakeTab stake={stake}/>)}                           
      </div>
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
          To compare your stake with other pools, follow a pool by using the form on top of the page or by clicking <Link to={this.props.location.pathname + '/pools/new'} className='hardlink'>here</Link>.
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
            {this.props.alert.message.split('<b>').splice(0,1)}
            <b>{this.props.alert.message.split('<b>').splice(1,1)}</b>
          </div>
          </div>
        }
        <div className='d-flex justify-content-center'>
          {this.props.loading && 
            <div className='spinner1 border rounded d-flex justify-content-center vw-50 vh-50'>
                <img className='mb-3 mt-auto mb-auto' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
          }
        </div>
        {(this.props.loading && !epoch_stake) && <h2 className='text-muted m-5'>Loading...</h2>}
        {epoch_stake && <EpochTab epochno={epoch_stake.epoch_no} stakes={[epoch_stake]}/>}
        <div className='text-muted rounded pt-3 pl-2 pr-2 pb-1 mt-0 mb-5 shadow' style={{background:'rgba(235, 255, 254,0.5)'}}>
          {this.textIfEmpty()}
          {this.deployProjectedEpochStakes()}
        </div>
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

