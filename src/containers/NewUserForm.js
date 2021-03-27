import React, { Component } from 'react'
import { connect } from "react-redux";
import { register } from '../actions/user.actions'

class NewUserForm extends Component {

    state = {
      user: {
        username: '',
        password: '',
        email: ''
      }
    }

    handleChange = (e) => {
      this.setState({
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value
        }
      })
    }

    fetchOnSubmit = (e) => {
      e.preventDefault()
      this.props.register({user:this.state.user})
        .then((res) => {
          if (this.props.alerts.success) {
            this.props.history.push(`/signin`)
          }
        })
        .then(() => console.log('clear messages'))
        .catch((err) => console.log(err))
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            <h2 className='text-dark mb-4'>Register</h2>
            <label htmlFor="username" className="block">
              Username*
              <span className="text-danger">{this.props.errors.username ? ` ${this.props.errors.username.join(', ')}` : null}</span>
            </label>
            <input
              type="text"
              name="username"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'
              onChange={this.handleChange}>
            </input>
            <label htmlFor="password" className="block">
              Password*
              <span className="text-danger">{this.props.errors.password ? ` ${this.props.errors.password.join(', ')}` : null}</span>
            </label>
            <input
              type="password"
              name="password"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'
              onChange={this.handleChange}>
            </input>
            <label htmlFor="email" className="block">
              Email (?)
              <span className="text-danger">{this.props.errors.email ? ` ${this.props.errors.email.join(', ')}` : null}</span>
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

const mapDispatchToProps = dispatch => {
  return {
    register: (body) => {
      return dispatch(register(body))
    }
  };
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    alerts: state.alerts,
    registering: state.registering
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);



