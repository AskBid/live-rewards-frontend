import React, { Component } from 'react'
import { connect } from "react-redux";
import { logout } from '../actions/session.actions'

class NewUserForm extends Component {

    actionOnSubmit = (e) => {
      e.preventDefault()
      this.props.logout()
    }

    render() {
        return (
          <form onSubmit={this.actionOnSubmit}>
            <h1 className='text-dark'>User</h1>
            <button className='h-1 border-0 border-primary rounded-pill mb-5 mt-4 ml-auto mr-auto' 
                style={{width:'60%',display:'block'}} type='Submit'>Logout</button>
          </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(logout())
    }
  };
}

export default connect(null, mapDispatchToProps)(NewUserForm);



