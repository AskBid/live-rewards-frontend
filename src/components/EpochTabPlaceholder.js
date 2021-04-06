import React from 'react'
import StakeTab from './StakeTab'

const EpochTab = ({epochno, stakes}) => {
  return (
      <div className='text-light bg-white bg-gradient rounded pt-3 shadow mb-5'>
        <div className='row m-auto pr-2 pl-2'>
          <div className='mt-auto mb-auto ml-5 mr-5'>
            <h1 className='ml-auto mr-auto text-center tabloader'>000</h1>
          </div>
          <div className='col bg-light rounded border border-secondary ml-3 mr-3 mb-3 p-1 pl-3 d-flex flex-row flex-wrap'>
            <div className=' mt-auto mb-auto'>
              <h2 className=' mt-auto mb-auto mr-5 tabloader'>
                NONE
              </h2>
            </div>
            <div className='container col'>
              <div className='ml-auto'>
                <div className='row rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
                  <div className='col-sm text-right pr-1 text-nowrap mt-auto mb-auto tabloader'>rewards:</div>
                  <div className='col-sm mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold min-vw-10'>
                    <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace tabloader'>
                      ₳₳₳₳₳₳
                    </h4>
                  </div>
                </div>
                <div class="dropdown-divider m-0"></div>  
                <div className='row  rounded d-flex flex-row flex-nowrap'>
                  <div className='col-sm text-right pr-1 text-nowrap tabloader'>delegation:</div>
                  <div className='col-sm text-right pr-1 text-monospace text-nowrap min-vw-10 tabloader'>
                    ₳₳₳
                  </div>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div className='row  rounded d-flex flex-row flex-nowrap'>
                  <div className='col-sm text-right pr-1 text-nowrap tabloader'>blocks:</div>
                  <div className='col-sm text-right pr-1 text-monospace text-nowrap min-vw-10 tabloader'>x/x</div>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div className='row  rounded d-flex flex-row flex-nowrap'>
                  <div className='col-sm text-right pr-1 text-nowrap tabloader'>ROS:</div>
                  <div className='col-sm text-right pr-1 text-monospace text-nowrap min-vw-10 tabloader'>x%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="progress mt-2" style={{height: "3px"}}>
          <div className="progress-bar tabloader" role={'progressbar'} style={{width: '3%'}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
  )
}

export default EpochTab


