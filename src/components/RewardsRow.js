import React from 'react'
import Skeleton from 'react-loading-skeleton';

export const RewardsRow = ({rewards}) => {

  return (
    <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
      <div className='col-sm text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
      <div className='col-sm mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold min-vw-10' style={{ minWidth:'8.5em'}}>
        <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace'>
          {rewards}
        </h4>
      </div>
    </div>
  )
}
