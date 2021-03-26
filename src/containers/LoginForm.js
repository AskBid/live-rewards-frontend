import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class NewUserForm extends Component {

    fetchOnSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      const body = new FormData()

      body.append('user[username]', form.username.value)
      body.append('user[password]', form.password.value)
      body.append('user[email]', form.email.value)
      body.append('user[stake_address]', form.stake_address.value)

      fetch('http://localhost:3001/users', {
        method: 'POST',
        body
      }).then(resp => resp.json())
        .then(json => {
          this.props.history.push("/live-rewards");
        })
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
                className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
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
                className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
              </input>
            </div>
            <div class="row  mb-5">
                <div class="col d-flex"><button className='h-1 border-0 rounded-pill ml-auto mr-auto' style={{width:'100%',display:'inline'}} type='Submit'>Submit</button></div>
                <div class="col d-flex"><Link to="/Signup" className='ml-auto mr-auto mt-auto mb-auto text-primary hardlink'>Register</Link></div>
            </div>
          </form>
        )
    }
}

export default connect()(NewUserForm);
