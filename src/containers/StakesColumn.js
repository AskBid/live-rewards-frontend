import React, { Component } from 'react'
import { connect } from "react-redux";
import { currentEpoch } from '../actions/epoch.actions';
import StakeTab from '../components/StakeTab';

class StakesColumn extends Component {

  state = {}

  componentDidMount() {
    console.log('current epoch')
    this.props.getCurrentEpoch().then(() => console.log(this.props.currentEpoch))
    console.log(this.props.currentEpoch)
  }

  render() {
    return (
      <React.Fragment>
        <StakeTab epochno={255} />
        <StakeTab epochno={254} />
        <StakeTab epochno={253} />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentEpoch: () => dispatch(currentEpoch())
  }
}

const mapStateToProps = store => {
  return {
    currentEpoch: store.epochs.current
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StakesColumn);





