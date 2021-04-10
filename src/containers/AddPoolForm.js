import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTickers } from '../actions/pool.actions'
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

  addressChecksMessage = () => {
    const ticker = this.state.text
    const chars = ticker.length
    if ((chars > 5 || (chars > 0 && chars < 3)) && !(ticker.includes("pool1") && chars.length === 56)) {
      return <div className='alert alert-info mt-4 position-absolute messages'>
        <p>{`Pool TICKER can only be between 3 and 5 characters.`}</p>
        {`Pool addresses should start with 'pool1' and be 56 characters long. (${chars}/56)`}
      </div>
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() { 
    return (
    <React.Fragment>
    <form className='row d-inline-flex w-100 mr-auto ml-auto' onSubmit={this.handleSubmit}>
      <div>
        <button onClick={this.hideButton} className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1'>
          Hide
        </button>
      </div>
      <AutoComplete 
        suggestions={this.state.suggestions}
        handleTickerInputChange={this.handleTickerInputChange} 
        text={this.state.text}/>
      <button className='col-auto border-0 text-nowrap rounded-pill ml-1 mr-1 mt-auto mb-auto w-auto'
        type='Submit'
        disabled={!this.buttonActivation()}>
        Follow Pool
      </button>
    </form>
    <div className='d-flex row w-100 justify-content-center'> 
      {this.addressChecksMessage()}
    </div>
    </React.Fragment>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    getTickers: (ticker) => dispatch(getTickers(ticker))
  }
}

const mapStateToProps = state => {
  return {
    tickers: state.pools.tickers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPoolForm)


