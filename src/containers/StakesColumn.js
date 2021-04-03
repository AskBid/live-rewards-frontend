import React, { Component } from 'react'
import { connect } from "react-redux";
import { currentEpoch } from '../actions/epoch.actions';
import { addEpoch } from '../actions/epoch.actions';
import StakeTab from '../components/StakeTab';

class StakesColumn extends Component {

  componentDidMount() {
    this.props.getCurrentEpoch().then((res) => {
      for (let i=0; i < 3; i++) {
        this.props.addEpoch(this.props.currentEpoch - i)
      }
    }).catch((err) => console.log(err))
  }

  deployEpochs = () => {
    return this.props.epochNos.map(epochno => <StakeTab epochno={epochno} />)
  }

  render() {
    return (
      <React.Fragment>
        {this.deployEpochs()}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentEpoch: () => dispatch(currentEpoch()),
    addEpoch: (epochno) => dispatch(addEpoch(epochno))
  }
}

const mapStateToProps = store => {
  return {
    currentEpoch: store.epochs.current,
    epochNos: store.epochs.epochNos
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StakesColumn);





