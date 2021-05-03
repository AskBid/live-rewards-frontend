import React from 'react'
import Skeleton from 'react-loading-skeleton';

export const ValueRow = ({symbol, value, label, skeleton}) => {
  return (
    <React.Fragment>
      {/*<div className="dropdown-divider m-0" style={{borderColor:'rgba(0, 123, 255, 0.45)'}}></div>  */}
      <div className="dropdown-divider m-0"></div>  
    {
      skeleton ? <Skeleton /> :
      <React.Fragment>
        <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
          <div className='col-sm text-right pr-1 text-nowrap text-muted'>
            {label}
          </div>
          <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10' style={{minWidth:'8.5em'}}>
            {symbol}{value}
          </div>
        </div>
      </React.Fragment>
    }
    </React.Fragment>
  )
}
