import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import MovingText from '../components/MovingText';
import { groupBy } from 'underscore';
import { Link } from 'react-router-dom'
import { noUserEpochStakes } from '../actions/epoch_stake.actions'
import { addUserStake } from '../actions/stake_address.actions'
import { getAddrFromLocalStorage } from '../helpers/local_storage_methods'

class StakesColumn extends Component {

  componentDidMount() {
    if (this.props.epoch_stakes && !this.props.epoch_stakes[0].id) {
      this.props.username &&
        this.props.userEpochStakes(this.props.username).catch(res => this.props.noServer())
      !this.props.username &&
        this.props.noUserEpochStakes(getAddrFromLocalStorage()).catch(res => this.props.noServer())
    }
  }

  movingText = () => {
    return (
      <>
      <b>&uarr; Enter</b> one of your <b>receiving address</b> to see your <b>rewards</b>.
      <br/>
      Below are the rewards of a random wallet <b>&darr;</b> 
      </>
    )
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
    const onClickLink = () => {
      if (this.props.username) {
        this.props.addUserStake(this.props.username, '')
      }
    }
    return (
      <React.Fragment>
        <div className='text-muted rounded pt-2 pl-2 pr-2 pb-2 mb-5 shadow' style={{background:'rgba(255, 255, 255,0.5)'}}>
          <p className='text-muted mb-3 mt-2 ml-5 mr-5'>
          <span className='text-primary'>Enter your <b>Stake Address</b> to check your latest rewards.</span>
          <br/>
          If you don't know how to find your address, please visit the <Link to={`/howto`} className='hardlink grey'>How To</Link>.
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
          <div className={`position-absolute mt-0 w-100 d-flex justify-content-center`} onClick={this.props.closeAlert} style={{cursor:'pointer'}}>
            <div className={`alert ${this.props.alert.type} w-75`}>
              {this.props.alert.message}
            </div>
          </div>
        }
        {((this.props.epoch_stakes.length === 0) && this.props.username) && this.textIfEmpty()}
        {!this.props.username && !(getAddrFromLocalStorage().length > 0) && <MovingText textElement={this.movingText()}/>}
        {this.deployEpochs()}
        <div style={{minHeight:'100px'}}></div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userEpochStakes: (username) => dispatch(userEpochStakes(username)),
    addUserStake: (user, address) => dispatch(addUserStake(user, address)),
    noUserEpochStakes: (address) => dispatch(noUserEpochStakes(address)),
    closeAlert: () => dispatch({type: 'ALERT_CLEAR'}),
    noServer: () => dispatch({type: 'ALERT_ERROR', message: 'server is temporarily OFFLINE. Sorry for the inconvenience.'})
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

