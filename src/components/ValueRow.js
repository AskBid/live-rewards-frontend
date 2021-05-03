import React from 'react'
import Skeleton from 'react-loading-skeleton';

export const ValueRow = ({symbol, value, label}) => {
  // debugger
  return (
    <React.Fragment>
    <div className="dropdown-divider m-0"></div>  
    <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
      <div className='col-sm text-right pr-1 text-nowrap text-muted' style={{minWidth:'7em'}}>
        {value ? label : <Skeleton />}
      </div>
      <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10' style={{minWidth:'8.5em'}}>
        {value ? `${symbol}${value}` : <Skeleton />}
      </div>
    </div>
    </React.Fragment>
  )
}
