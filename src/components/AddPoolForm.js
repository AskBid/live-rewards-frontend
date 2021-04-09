import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTickers } from '../actions/pool.actions'

class AddPoolForm extends Component {

  state = {
    ticker: ''
  }

  componentDidMount() {
    // avoid to fetch tickers every time component is mounted?
    !this.props.tickers && this.props.getTickers()
  }

  handleAddressInputChange = (e) => {
    this.setState({
      ticker: e.target.value
    })
  }

  buttonActivation = () => {
    const ticker = this.state.ticker 
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
    const ticker = this.state.ticker
    const chars = ticker.length
    if ((chars > 5 || (chars > 0 && chars < 3)) && !(ticker.includes("pool1") && chars.length === 56)) {
      return <div className='alert alert-info mt-4 position-absolute'>
        <p>{`Pool TICKER can only be between 3 and 5 characters.`}</p>
        {`Pool addresses should start with 'pool1' and be 56 characters long. (${chars}/56)`}
      </div>
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() { return (
    <React.Fragment>
    <form className='row d-inline-flex w-100 mr-auto ml-auto' onSubmit={this.handleSubmit}>
      <div>
        <button onClick={this.hideButton} className='col buttonsbar border-0 text-nowrap rounded mt-auto mb-auto ml-1 mr-1'>
          Hide
        </button>
      </div>
      <fieldset className='col w-100 d-inline-flex p-0 pl-2'>
        <input
          type="text"
          name="pool"
          placeholder="TICKR or pool1cuxntl7p... (If empty, will pick a random Pool)"
          className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded'
          onChange={this.handleAddressInputChange}>
        </input>
      </fieldset>
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


