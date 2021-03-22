import React, { Component } from 'react'

export default class NewUserForm extends Component {
    render() {
        return (
          <form>
            <label htmlFor="name" className="block">
              Username*
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
            </input>
            <label htmlFor="name" className="block">
              Password*
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className='w-100 border border-primary shadow p-2 mb-5 rounded-3'>
            </input>
            <label htmlFor="name" className="block">
              Email?
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className='w-100 border border-primary shadow p-2 mb-4 rounded-3'>
            </input>
            <label htmlFor="name" className="block">
              Stake Address?
              <span className="text-red-400"></span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className='w-100 border border-primary shadow p-2 mb-5 rounded-3'>
            </input>
            <button className='w-100 h-1 border border-primary rounded-pill' type='Submit'>Submit</button>
          </form>
        )
    }
}
