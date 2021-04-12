import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import { groupBy } from 'underscore';

class StakesColumn extends Component {

  componentDidMount() {
    this.props.userEpochStakes(this.props.username)
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
        return <EpochTab key={epochno} epochno={epochno} stakes={epoch_stakes_by_epoch[epochno]} />
      })
    } else { return undefined }
  }

  render() {
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
    epoch_stakes: store.epoch_stakes.list,
    loading: store.epoch_stakes.loading,
    alert: store.alert
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StakesColumn);

