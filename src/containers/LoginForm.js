import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class NewUserForm extends Component {

    state = {
      username: '',
      password: '',
    }

    handleChange = (e) => {
      this.setState({
          ...this.state,
          [e.target.name]: e.target.value
      })
    }

    fetchOnSubmit = (e) => {
      e.preventDefault()
      console.log(this.state)
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            <div class="row">
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
            </div>
            <div class="row">
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
            </div>
            <div class="row  mb-5">
                <div class="col d-flex"><button className='h-1 border-0 rounded-pill ml-auto mr-auto' style={{width:'100%',display:'inline'}} type='Submit'>LogIn</button></div>
                <div class="col d-flex"><Link to="/Signup" className='ml-auto mr-auto mt-auto mb-auto text-primary hardlink'>Register</Link></div>
            </div>
          </form>
        )
    }
}

export default connect()(NewUserForm);
