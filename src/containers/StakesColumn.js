import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import DummyEpochTab from '../components/DummyEpochTab';
import { groupBy } from 'underscore';
import { Link } from 'react-router-dom'
import { unregisteredEpochStakes } from '../actions/epoch_stake.actions'
import { addUserStake } from '../actions/stake_address.actions'

class StakesColumn extends Component {

  componentDidMount() {
    (this.props.username && (this.props.epoch_stakes.length === 0)) && 
      this.props.userEpochStakes(this.props.username)
    if (!this.props.username && (this.props.epoch_stakes.length === 0)) {
      this.props.unregisteredEpochStakes('')
    }
    console.log('didMount')
  }

  deployEpochs = () => {
    const { epoch_stakes } = this.props
    if (!!epoch_stakes.length) {
      const epoch_stakes_by_epoch = groupBy(epoch_stakes, 'epoch_no')
      const ordered_keys = Object.keys(epoch_stakes_by_epoch)
        .map(str => parseInt(str))
        .sort((a,b) => a + b)
        .reverse()
      return ordered_keys.map(epochno => {
        return <EpochTab key={epochno} epochno={epochno} stakes={epoch_stakes_by_epoch[epochno]} tabType={this.props.username ? 'live-rewards' : 'live-rewards-unregistered'} />
      })
    } else { return undefined }
  }

  textIfEmpty = () => {
    const loggedOutMessage = () => {
      return (
        <React.Fragment>
          <Link to={`/login`} className='hardlink'>Login</Link> or <Link to={`/signup`} className='hardlink'>Register</Link> for full functionalities.
          <br/>
          {/*<span className='text-info'>Or you can still add one <b>Stake Address</b> to check your latest rewards.</span>*/}
          {/*<br/>*/}
        </React.Fragment>
      )
    }

    const loggedInMessage = () => {
      return (
        <span className='text-info'>Enter your <b>Stake Address</b> to check your latest rewards.</span>
      )
    }

    const onClickLink = () => {
      if (this.props.username) {
        this.props.addUserStake(this.props.username, '')
      } else {
        this.props.unregisteredEpochStakes('')
      }
    }

    return (
      <React.Fragment>
        <div className='text-muted rounded pt-2 pl-2 pr-2 pb-2 mb-5 shadow' style={{background:'rgba(255, 255, 255,0.5)'}}>
          <p className='text-muted mb-3 mt-2 ml-5 mr-5'>
          {this.props.username ? loggedInMessage() : loggedOutMessage()}
          <br/>
          If you don't know how to find your stake address, please visit the <Link to={`/howto`} className='hardlink grey'>How To</Link>.
          <br/>
          To add a random stake address click -> <a onClick={onClickLink} className='hardlink grey' style={{cursor:'pointer'}}>Random Stake!</a>.
        </p>
        </div>
      </React.Fragment>
    )
  }

  render() {
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
            <div className='spinner border rounded d-flex justify-content-center vw-50 vh-50'>
                <img className='mb-3 mt-auto mb-auto' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
          }
        </div>
        {((this.props.epoch_stakes.length === 0) || !this.props.username) && this.textIfEmpty()}
        {this.deployEpochs()}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userEpochStakes: (username) => dispatch(userEpochStakes(username)),
    addUserStake: (user, address) => dispatch(addUserStake(user, address)),
    unregisteredEpochStakes: (address) => dispatch(unregisteredEpochStakes(address)),
    closeAlert: () => dispatch({type: 'ALERT_CLEAR'})
  }
}

const mapStateToProps = store => {
  return {
    username: store.sessions.user,
    epoch_stakes: store.epoch_stakes.list,
    loading: store.epoch_stakes.loading,
    alert: store.alert
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StakesColumn);

