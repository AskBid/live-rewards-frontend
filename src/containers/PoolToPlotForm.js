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
    cursor: -1
  }

  componentDidMount() {
    this.props.getDelegationFlow(this.props.match.params.epoch_no)
      .then(res => this.props.tickersMap = this.getTickersFromDeleFlow(res))
  }

  getTickersFromDeleFlow = (deleFlow) => {
    let obj = {}
    Object.keys(deleFlow).each(pool_hash_id => {
      obj = {...obj, [deleFlow[pool_hash_id].ticker]: pool_hash_id}
    }) 
  }

  handleTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      //matches to string starting with the value, 'i' is for case insenstitive.
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = this.props.tickers.sort().filter(tick => regex.test(tick))
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
    e.preventDefault()
    const username = this.props.match.params.username
    const epoch_stake_id = this.props.match.params.epoch_stake_id
    const ticker = (this.state.text === '') ? 
      this.props.tickers[Math.floor(Math.random() * this.props.tickers.length)] : this.state.text
    this.props.addUserPoolHash(username, ticker)
      .then(res => this.props.getComparedEpochStake(res.user_pool_hash_id, epoch_stake_id))
      .catch(err => console.log(err))
  }

  render() { 
    return (
    <React.Fragment>
      <div className='d-flex d-inline-flex w-100 mr-auto ml-auto'>
        {/*<Link to={`/live-rewards`}>
          <button className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1' alt='Go Back'>
            ⟵
          </button>
        </Link>*/}
        <form className='row d-inline-flex w-100 mr-auto ml-auto'
          onSubmit={this.handleSubmit}>
          <AutoComplete 
            suggestions={this.state.suggestions}
            handleTextChange={this.handleTextChange} 
            selectSuggestion={this.selectSuggestion}
            text={this.state.text}/>
          <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto'
            type='Submit'
            disabled={!this.buttonActivation()}>
            Follow Pool
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
    delegation_flow: state.delegation_flow.delegationFlow
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolToPlotForm)


