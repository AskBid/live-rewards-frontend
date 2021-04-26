import React from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import chart_delegation_flows from '../helpers/chart_delegation_flows'

function DelegationFlows({match}) {

    return (
      <div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<PoolCompareControlBar />
	        	{chart_delegation_flows()}
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default DelegationFlows