import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTickers } from '../actions/pool.actions'
import { addUserPoolHash } from '../actions/pool_compared_stake.actions'
import AutoComplete from '../components/AutoComplete'
import { ButtonAdd, ButtonNav } from '../components/ButtonAddElement.js'
import SquareLoader from "react-spinners/SquareLoader";
import CurrencySelector from '../components/CurrencySelector';
import { ERROR } from '../actions'

class AddPoolForm extends Component {

  state = {
    text: '',
    suggestions: [],
    cursor: -1
  }

  componentDidMount() {
    // avoid to fetch tickers every time component is mounted?
    !this.props.tickers && this.props.getTickers().then((ts) => {
      this.setState({
        suggestions: ts.slice(Math.random(this.props.tickers.length-101), 100)
      })
    })
  }

  handleTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      //matches to string starting with the value, 'i' is for case insenstitive.
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = this.props.tickers.sort().filter(tick => regex.test(tick))
    } else {
      suggestions = this.props.tickers.slice(Math.random(this.props.tickers.length-101), 100)
    }
    this.setState({
      text: e.target.value,
      suggestions
    })
  }

  selectSuggestion = (value) => {
    this.setState({
      text: value,
      suggestions: this.props.tickers.slice(Math.random(this.props.tickers.length-101), 100)
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
    const epoch_stake_id = this.props.match.params.epoch_stake_id
    const ticker = (this.state.text === '') ? this.props.tickers[Math.floor(Math.random() * this.props.tickers.length)] : this.state.text
    if (this.props.pools.length < 4) {
      this.props.addUserPoolHash(this.props.user, ticker, epoch_stake_id)
    } else {
      this.props.errorMessage('You are following too many Pools. Unfollow one of them before following a new one.')
    }
  }

  render() { 
    return (
    <React.Fragment>
      <div className='col-lg d-flex flex-nowrap justify-content-between mt-2 p-0'>
        <form className='w-100 d-inline-flex flex-grow-1 justify-content-center align-items-center mt-2 mb-2 ml-2 mr-0' onSubmit={this.handleSubmit}>
          <Link to={`/live-rewards`}>
            <ButtonNav className='pr-2 pl-2 shadow-sm border-0 text-nowrap rounded mr-2 ml-0 d-flex justify-content-center align-items-center' alt='Go Back'>
              <b>⟵</b>
            </ButtonNav>
          </Link>
          <AutoComplete 
          suggestions={this.state.suggestions}
          handleTextChange={this.handleTextChange} 
          selectSuggestion={this.selectSuggestion}
          text={this.state.text}/>
          <ButtonAdd className='text-nowrap rounded-pill ml-1 shadow-sm h-100 d-flex justify-content-center align-items-center'
            type='Submit'
            disabled={!this.buttonActivation()}
            style={{outline: 'none !important'}}>
            <div className="position-absolute" style={{top:'13px'}}>{this.props.loading && <SquareLoader color='rgba(255,255,255,0.4)' size={23}/>}</div>
            <b> Follow</b>
          </ButtonAdd>
        </form>
        <CurrencySelector/>
      </div>
    </React.Fragment>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    getTickers: () => dispatch(getTickers()),
    addUserPoolHash: (username, ticker, epoch_stake_id) => dispatch(addUserPoolHash(username, ticker, epoch_stake_id)),
    errorMessage: (message) => dispatch({type: ERROR, message})
  }
}

const mapStateToProps = state => {
  return {
    tickers: state.pools.tickers,
    loading: state.pool_compared_stakes.loading,
    user: state.sessions.user,
    pools: state.pool_compared_stakes.list
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPoolForm)


