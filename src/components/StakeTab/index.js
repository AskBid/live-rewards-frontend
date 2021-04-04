import React from 'react'

const StakeTab = ({stakes}) => {
  return (
    <div className='container col'>
      <div className='ml-auto'>
        <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
          <div className='col text-right pr-1 text-nowrap text-muted'>your delegation:</div>
          <div className='col-sm-5 text-right pr-1 text-monospace text-muted text-nowrap'>$234,000</div>
        </div>
        <div class="dropdown-divider m-0"></div>  
        <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
          <div className='col text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
          <div className='col-sm-5 mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold'>
            <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace'>$340</h4>
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
  )
}

export default StakeTab


