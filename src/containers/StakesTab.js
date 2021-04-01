import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class StakesTab extends Component {

  state = {}

  componentDidMount() {
    this.props.currentEpoch()
  }

  render() {
    return (
      <div className='text-light bg-white bg-gradient rounded pt-3 shadow'>
        {
        //<h6 className='small'>stake ...r7fx5g</h6>
        }
        <div className='row m-auto pr-2 pl-2'>
          <div className='mt-auto mb-auto ml-5 mr-5'>
            <h1 className='text-muted ml-auto mr-auto text-center'>255</h1>
          </div>
          <div className='col bg-light rounded border border-secondary ml-1 d-flex flex-row flex-wrap'>
            <div className='text-dark mt-auto mb-auto'>
              <h2 className='text-dark mt-auto mb-auto mr-5'>DIGI</h2>
            </div>
            <div className='container col'>
              <div className='ml-auto'>
                <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
                  <div className='col text-right pr-1 text-nowrap text-muted'>your delegation:</div>
                  <div className='col-sm-5 text-right pr-1 text-monospace text-muted text-nowrap'>$234,000</div>
                </div>
                <div class="dropdown-divider m-0"></div>  
                <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
                  <div className='col text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
                  <div className='col-sm-5 mt-auto mb-auto text-right pr-1 text-monospace text-info text-nowrap font-weight-bold'>
                    <h4 className='mt-auto mb-auto pt-2 pb-2'>$340</h4>
                  </div>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                  <div className='col text-right pr-1 text-nowrap'>pool's blocks:</div>
                  <div className='col-sm-5 text-right pr-1 text-monospace text-muted text-nowrap'>3</div>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                  <div className='col text-right pr-1 text-nowrap'>estimated blocks:</div>
                  <div className='col-sm-5 text-right pr-1 text-monospace text-muted text-nowrap'>6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="progress mt-4" style={{height: "3px"}}>
          <div className="progress-bar bg-info" role={'progressbar'} style={{width: '60%'}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
    )
  }
}


export default StakesTab;





