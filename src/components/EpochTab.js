import React from 'react'
import StakeTab from './StakeTab'

const EpochTab = ({epochno, stakes}) => {
  return (
      <div className='text-light bg-white bg-gradient rounded pt-3 shadow mb-5'>
        <div className='row m-auto pr-2 pl-2 d-flex flex-row'>
          <div className='mt-auto mb-auto ml-5 mr-1 d-flex flex-row flex-wrap'>
            <div className='col ml-1 mr-1'>
              <h8 className='text-muted ml-auto mr-auto text-center d-flex justify-content-center'>epoch</h8>
              <h1 className='text-muted ml-auto mr-auto text-center'>{epochno}</h1>
            </div>
            <div className='col ml-1 mr-1 bg-light rounded'>
                <p className='text-muted'>Completed</p>
                <p className='text-muted sm'>29/Mar</p>
            </div>
          </div>
          {stakes.map(stake => <StakeTab stake={stake} />)}
        </div>
        <div className="progress mt-2" style={{height: "3px"}}>
          <div className="progress-bar bg-info" role={'progressbar'} style={{width: '60%'}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
  )
}

export default EpochTab


