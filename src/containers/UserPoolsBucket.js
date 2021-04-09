import React, { Component } from 'react'
import { connect } from "react-redux";
import { userEpochStakes } from '../actions/epoch_stake.actions';
import EpochTab from '../components/EpochTab';
import { groupBy } from 'underscore';

class UserPoolsBucket extends Component {

  componentDidMount() {
  }

  deployEpochs = () => {
  }

  render() {
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
  }
}

const mapStateToProps = store => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPoolsBucket);

