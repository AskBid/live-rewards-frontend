import React from 'react'
import numeral from 'numeral'
import { DeleteBtn, CloseIcon } from './DeleteButton'


const StakeTab = ({stake}) => { 
  const ticker = stake.pool_hash.pool.ticker
  return (
    <div className='col bg-light rounded border border-secondary ml-3 mr-3 mb-3 p-0 d-flex flex-row flex-wrap'>
      <div className='flex-row d-flex w-100'>
        <DeleteBtn className='align-top mt-aut p-1 mb-auto rounded h-100 ml-0 mr-0' style={{width:'2vw'}}>
          <CloseIcon /> 
        </DeleteBtn>
        <div className='col d-flex flex-row flex-wrap m-0 p-0'>
          <div className='col text-dark mt-auto mb-auto'>
            <h2 className='text-dark mt-auto mb-auto'>
              {ticker}
            </h2>
          </div>
          <div className='container col'>
            <div className='ml-auto'>
              <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
                <div className='col-sm text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
                <div className='col-sm mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold min-vw-10'>
                  <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace'>
                    ₳{numeral((parseInt(stake.calc_rewards))).format('0,0')}
                  </h4>
                </div>
              </div>
              <div class="dropdown-divider m-0"></div>  
              <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap text-muted'>delegation:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>
                  ₳{ numeral((parseInt(stake.amount)/1000000)).format('0,0') }
                </div>
              </div>
              <div class="dropdown-divider m-0"></div>
              <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap'>blocks:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>3/6</div>
              </div>
              <div class="dropdown-divider m-0"></div>
              <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap'>ROS:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>3%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeTab


