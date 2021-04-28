import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import { addUserPoolHash } from '../actions/pool_compared_stake.actions'
import { getComparedEpochStake } from '../actions/pool_compared_stake.actions';
import AutoComplete from '../components/AutoComplete'
import chart_delegation_flows from '../helpers/chart_delegation_flows'

class PoolToPlotForm extends Component {

  state = {
    text: '',
    suggestions: [],
    cursor: -1,
    tickersMap: {},
    ticker: this.props.match.params.ticker
  }

  componentDidMount() {
    (this.props.delegation_flow || this.props.epoch_no != this.props.match.params.epoch_no)
    &&
    this.props.getDelegationFlow(this.props.match.params.epoch_no)
      .then(res => {
        const tickersMap = this.getTickersFromDeleFlow(res)
        this.setState({
          tickersMap: tickersMap
        })
        chart_delegation_flows(res, tickersMap[this.props.match.params.ticker], this.props.svg)
        this.setState({
          suggestions: Object.keys(this.state.tickersMap).sort()
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ticker !== this.state.ticker) {
      this.state.ticker &&
      chart_delegation_flows(this.props.delegation_flow, this.state.tickersMap[this.state.ticker], this.props.svg)
    }
  }

  getTickersFromDeleFlow = (deleFlow) => {
    let obj = {}
    Object.keys(deleFlow).forEach(pool_hash_id => {
      obj = {...obj, [deleFlow[pool_hash_id].ticker]: pool_hash_id}
    }) 
    return obj
  }

  handleTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      //matches to string starting with the value, 'i' is for case insenstitive.
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = Object.keys(this.state.tickersMap).sort().filter(tick => regex.test(tick))
    } 
    this.setState({
      text: e.target.value,
      suggestions
    })
  }

  selectSuggestion = (value) => {
    this.setState({
      text: value,
      suggestions: []
    })
  }

  buttonActivation = () => {
    const ticker = this.state.text 
    if (ticker.length === 0) {
      return true
    } else { 
      return (ticker.includes("pool1") && ticker.length === 56) || (ticker.length < 6 && ticker.length > 2)
    }
  }

  handleSubmit = (e) => {
    !(typeof(e) == 'string') && e.preventDefault()
    const ticker = (this.state.text === '') 
      ? 
      Object.keys(this.state.tickersMap)[Math.floor(Math.random() * Object.keys(this.state.tickersMap).length)]
      : 
      this.state.text
    this.props.history.push(`/delegation-flows/epochs/${this.props.match.params.epoch_no}/pools/${ticker}`)
    this.setState({
      ticker
    })
  }

  render() { 
    return (
    <React.Fragment>
      <div className='d-flex d-inline-fle w-100'>
        <Link to={`/live-rewards`}>
          <button className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1' alt='Go Back'>
            ⟵
          </button>
        </Link>
        <form className='row d-inline-flex w-100 mr-auto ml-auto'
          onSubmit={this.handleSubmit}>
          <AutoComplete 
            suggestions={this.state.suggestions}
            handleTextChange={this.handleTextChange} 
            selectSuggestion={this.selectSuggestion}
            text={this.state.text}
            onClickOption={this.handleSubmit}
            placeholderOption={'TICKER (random pool if empty)'}/>
          <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto'
            type='Submit'
            disabled={!this.buttonActivation()}>
            Plot Pool Delegation Flow
          </button>
        </form>
      </div>
    </React.Fragment>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    getDelegationFlow: (epoch_no) => dispatch(getDelegationFlow(epoch_no)),
    addUserPoolHash: (username, ticker) => dispatch(addUserPoolHash(username, ticker)),
    getComparedEpochStake: (user_pool_hash_id, epoch_stake_id) => dispatch(getComparedEpochStake(user_pool_hash_id, epoch_stake_id))
  }
}

const mapStateToProps = state => {
  return {
    delegation_flow: state.delegation_flow.delegation_flow,
    epoch_no: state.delegation_flow.epoch_no
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolToPlotForm)


