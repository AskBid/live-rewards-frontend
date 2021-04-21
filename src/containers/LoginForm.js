import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { login } from '../actions/session.actions'

class LoginForm extends Component {

    state = {
      username: '',
      password: ''
    }

    handleChange = (e) => {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      })
    }

    fetchOnSubmit = (e) => {
      e.preventDefault()
      this.props.login(this.state)
        .then(user => this.props.history.push(`/live-rewards`))
        .catch(res => console.log)
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            { this.props.alert.message &&
              <div className={`alert ${this.props.alert.type}`}>
                {this.props.alert.message}
              </div>
            }
            <h2 className='text-dark mb-4'>Login{'  '}
              {this.props.submitting && 
                <img alt="spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
            </h2>
            <div>
              <fieldset className='ml-auto mr-auto w-100'>
                <label htmlFor="username" className="block">
                  Username*
                  <span className="text-red-400"></span>
                </label>
                <input
                  type="text"
                  name="username"
                  className='w-100 border border-primary shadow p-2 mb-4 rounded'
                  onChange={this.handleChange}>
                </input>
              </fieldset>
            </div>
            <div>
              <fieldset className='ml-auto mr-auto w-100'>
                <label htmlFor="password" className="block">
                  Password*
                  <span className="text-red-400"></span>
                </label>
                <input
                  type="password"
                  name="password"
                  className='w-100 border border-primary shadow p-2 mb-4 rounded-3 rounded'
                  onChange={this.handleChange}>
                </input>
              </fieldset>
            </div>
            <div className="row mb-5 ml-2 mr-2 mt-3">
                <div className="col-8 d-flex"><button className='h-1 border-0 rounded-pill ml-auto mr-auto' 
                  style={{width:'100%',display:'inline'}} type='Submit'>Login</button></div>
                <div className="col-4 d-flex">
                  <Link to="/Signup" className='ml-auto mr-auto mt-auto mb-auto text-primary hardlink'>Register</Link>
                </div>
            </div>
          </form>
        )
    }
}

const mapStateToProps = state => {
  return {
    submitting: state.sessions.submitting,
    alert: state.alert,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (credentials) => {
      return dispatch(login(credentials))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
