import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTickers } from '../actions/pool.actions'
import { addUserPoolHash } from '../actions/pool_compared_stake.actions'
import { getComparedEpochStake } from '../actions/pool_compared_stake.actions';
import AutoComplete from '../components/AutoComplete'

class AddPoolForm extends Component {

  state = {
    text: '',
    suggestions: [],
    cursor: -1
  }

  componentDidMount() {
    // avoid to fetch tickers every time component is mounted?
    !this.props.tickers && this.props.getTickers()
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

  hideButton = () => {
    this.props.history.goBack()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const ticker = (this.state.text === '') ? 
      this.props.tickers[Math.floor(Math.random() * this.props.tickers.length)] : this.state.text
    this.props.addUserPoolHash(this.props.match.params.username, ticker)
      .then(res => getComparedEpochStake(res.user_id, res.pool_hash_id))
      .catch(err => console.log(err))
  }

  render() { 
    return (
    <React.Fragment>
      <div className='d-flex d-inline-flex w-100 mr-auto ml-auto'>
        <div>
          <button onClick={this.hideButton} className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1'>
            Hide
          </button>
        </div>
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
    getTickers: () => dispatch(getTickers()),
    addUserPoolHash: (username, ticker) => dispatch(addUserPoolHash(username, ticker)),
    getComparedEpochStake: (user_id, pool_hash_id) => dispatch(getComparedEpochStake(user_id, pool_hash_id))
  }
}

const mapStateToProps = state => {
  return {
    tickers: state.pools.tickers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPoolForm)


