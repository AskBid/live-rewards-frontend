import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import MovingText from '../components/MovingText';
import { groupBy } from 'underscore';
import { Link } from 'react-router-dom'
import { noUserEpochStakes } from '../actions/epoch_stake.actions'
import { addUserStake } from '../actions/stake_address.actions'
import { sampleAmountEpochStakes } from '../actions/epoch_stake.actions'
import { getAddrFromLocalStorage } from '../helpers/local_storage_methods'

class StakesColumn extends Component {

  componentDidMount() {
    if (this.props.match.path.includes('sample')) {
      this.props.sampleAmountEpochStakes(this.props.match.params.amount)
        .catch(res => this.props.noServer())
    } else if (this.props.epoch_stakes.length != 0 && !this.props.epoch_stakes[0].id) {
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
        return <EpochTab key={epochno} epochno={epochno} stakes={epoch_stakes_by_epoch[epochno]} buttonType={3}/>
      })
    } else { return undefined }
  }

  textIfEmpty = () => {
    return (
      <React.Fragment>
        <div className='ml-auto mr-auto w-75 text-muted rounded p-5 mt-5 mb-5 shadow-sm' style={{background:'rgba(255, 255, 255,0.5)'}}>
          <h2 className="text-center pl-5 pr-5">Upsi! it seems that you don't have any wallet address associated...</h2>
          <br/>
          <h4 className="text-center">Enter one with the form above, or leave it empty, and submit, to visualise a random wallet!</h4>
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
        {!this.props.username && !(getAddrFromLocalStorage().length > 0) && <MovingText textElement={this.movingText()}/>}
        {this.props.epoch_stakes.length === 0 && this.textIfEmpty()}
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
    sampleAmountEpochStakes: (amount) => dispatch(sampleAmountEpochStakes(amount)),
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

