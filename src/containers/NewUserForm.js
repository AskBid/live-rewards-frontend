import React, { Component } from 'react'

export default class NewUserForm extends Component {

    fetchOnSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      const body = new FormData()

      body.append('user[username]', form.username.value)
      body.append('user[password]', form.password.value)
      body.append('user[email]', form.email.value)
      body.append('user[stake_address]', form.stake_address.value)
      console.log(Array.from(body)) 
      fetch('http://localhost:3001/users', {
        method: 'POST',
        body
      }).then(resp => resp.json())
        .then(json => {
          console.log(json);
          this.props.history.push('/')
        })
    }

    render() {
        return (
          <form onSubmit={this.fetchOnSubmit}>
            <label htmlFor="username" className="block">
              Username*
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="username"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
            </input>
            <label htmlFor="password" className="block">
              Password*
              <span className="text-red-400"></span>
            </label>
            <input
              type="password"
              name="password"
              className='w-100 border border-primary shadow p-2 mb-5 rounded-3'>
            </input>
            <button className='w-100 h-1 border border-primary rounded-pill mb-5' type='Submit'>Submit</button>
            <label htmlFor="email" className="block">
              Email?
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="email"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
            </input>
            <label htmlFor="stake_address" className="block">
              Stake Address?
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="stake_address"
              className='w-100 border border-primary shadow p-2 mb-5 rounded-3'>
            </input>
          </form>
        )
    }
}
