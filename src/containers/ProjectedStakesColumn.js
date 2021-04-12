import React, { Component } from 'react'
import { connect } from "react-redux";
import { getPoolCompareUserEpochStakes } from '../actions/projected_stake.actions';
import { getEpochStake } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';

class ProjectedStakesColumn extends Component {

  componentDidMount() {
    if (!this.props.history.location.pathname.includes('/pools/new')) {
      const { username, epoch_stake_id } = this.props.match.params
      if (!this.props.epoch_stake) {
        const epoch_stake = this.props.epoch_stakes.filter((epoch_stake) => epoch_stake.id === epoch_stake_id)[0]
        !epoch_stake && this.props.getEpochStake(epoch_stake_id)
      }
      this.props.projected_stakes && (!this.props.projected_stakes[0] && 
        this.props.getPoolCompareUserEpochStakes(username, epoch_stake_id))
    }
  }

  deployProjectedEpochStakes = () => {
    return (
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
    )
  }

  render() {
    const epoch_stake = this.props.epoch_stake
    return (
      <React.Fragment>
        { this.props.alert.message &&
          <div className={`w-100 d-flex justify-content-center`}>
          <div className={`alert ${this.props.alert.type} w-75`}>
            {this.props.alert.message.split('<b>').splice(0,1)}
            <b>{this.props.alert.message.split('<b>').splice(1,1)}</b>
          </div>
          </div>
        }
        <div className='d-flex justify-content-center'>
          {this.props.loading && 
            <div className='spinner border rounded d-flex justify-content-center vw-50 vh-50'>
                <img className='mb-3 mt-auto mb-auto' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
          }
        </div>
        {epoch_stake && <EpochTab epochno={epoch_stake.epoch_no} stakes={[epoch_stake]} buttonsOff={true} />}
        {this.deployProjectedEpochStakes()}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPoolCompareUserEpochStakes: (username, epoch_stake_id) => {
      return dispatch(getPoolCompareUserEpochStakes(username, epoch_stake_id))
    },
    getEpochStake: (epoch_stake_id) => dispatch(getEpochStake(epoch_stake_id))
  }
}

const mapStateToProps = store => {
  return {
    epoch_stakes: store.epoch_stakes.list,
    epoch_stake: store.epoch_stakes.epoch_stake,
    projected_stakes: store.projected_stakes.list,
    loading: store.epoch_stakes.loading,
    alert: store.alert
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectedStakesColumn);

