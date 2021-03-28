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
        .catch((err) => console.log(err))
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            <h2 className='text-dark mb-4'>Register{'  '}
              {this.props.registering && 
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
            </h2>
            <fieldset className='ml-auto mr-auto w-100'>
              <label htmlFor="username" className="block">
                Username*
                <span className="text-danger">{this.props.errors.username ? ` ${this.props.errors.username.join(', ')}` : null}</span>
              </label>
              <input
                type="text"
                name="username"
                className='w-100 border border-primary shadow p-2 mb-4 rounded'
                onChange={this.handleChange}>
              </input>
            </fieldset>
            <fieldset className='ml-auto mr-auto w-100'>
              <label htmlFor="password" className="block">
                Password*
                <span className="text-danger">{this.props.errors.password ? ` ${this.props.errors.password.join(', ')}` : null}</span>
              </label>
              <input
                type="password"
                name="password"
                className='w-100 border border-primary shadow p-2 mb-4 rounded'
                onChange={this.handleChange}>
              </input>
            </fieldset>
            <fieldset className='ml-auto mr-auto w-100'>
              <label htmlFor="email" className="block">
                Email (?)
                <span className="text-danger">{this.props.errors.email ? ` ${this.props.errors.email.join(', ')}` : null}</span>
              </label>
              <input
                type="text"
                name="email"
                className='w-100 border border-primary shadow p-2 mb-4 rounded'
                onChange={this.handleChange}>
              </input>
            </fieldset>
            <button className='h-1 border-0 border-primary rounded-pill mb-5 mt-4 ml-auto mr-auto' 
              style={{width:'60%',display:'block'}} type='Submit'>Submit</button>
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
    errors: state.users.errors,
    alerts: state.users.alerts,
    registering: state.users.registering
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);



