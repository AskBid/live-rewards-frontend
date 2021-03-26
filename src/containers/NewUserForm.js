import React, { Component } from 'react'
import { connect } from "react-redux";
import { register } from '../actions/user.actions'

class NewUserForm extends Component {

    state = {
      username: '',
      password: '',
      email: ''
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    fetchOnSubmit = (e) => {
      e.preventDefault()
      const user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }

      this.props.register({user: user})
        .then(resp => console.log(resp))
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            <h2 className='text-dark mb-4'>Register</h2>
            <label htmlFor="username" className="block">
              Username*
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="username"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'
              onChange={this.handleChange}>
            </input>
            <label htmlFor="password" className="block">
              Password*
              <span className="text-red-400"></span>
            </label>
            <input
              type="password"
              name="password"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'
              onChange={this.handleChange}>
            </input>
            <label htmlFor="email" className="block">
              Email (?)
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="email"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'
              onChange={this.handleChange}>
            </input>
            <button className='h-1 border-0 border-primary rounded-pill mb-5 mt-4 ml-auto mr-auto' style={{width:'60%',display:'block'}} type='Submit'>Submit</button>
          </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (body) => {
      return dispatch(register(body))
    }
  };
}

export default connect(null, mapDispatchToProps)(NewUserForm);



