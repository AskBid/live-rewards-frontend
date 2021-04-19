import React from 'react'

export const ValueRow = ({symbol, value, label}) => {

  return (
    <React.Fragment>
    <div className="dropdown-divider m-0"></div>  
    <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
      <div className='col-sm text-right pr-1 text-nowrap text-muted'>
        {label}
      </div>
      <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10' style={{'min-width':'8.5em'}}>
        {symbol}{value}
      </div>
    </div>
    </React.Fragment>
  )
}
