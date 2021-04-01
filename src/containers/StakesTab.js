import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class StakesTab extends Component {

    state = {}

    render() {
      return (
        <div className='row text-light bg-white bg-gradient rounded p-2 shadow'>
          {//<h6 className='small'>stake ...r7fx5g</h6>
          }
          <div className='col-auto mt-auto mb-auto'>
            <h1 className='text-muted'>255</h1>
          </div>
          <div className='col bg-light rounded border border-secondary'>
            <div className='text-dark'>
              <h2>DIGI</h2>
            </div>
            <div className='row text-dark justify-content-end items-stretch'>
              <div className='col text-right'>your delegation:</div>
              <div className='col-auto text-right text-monospace'>$234,000</div>
            </div>
            <div className='row text-dark justify-content-end items-stretch'>
              <div className='col text-right'>rewards:</div>
              <div className='col-auto text-right text-monospace'>$340</div>
            </div>
          </div>
        </div>
      )
    }
}


export default StakesTab;





