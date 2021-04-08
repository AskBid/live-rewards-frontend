import React from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'

function PoolCompare({match}) {

    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<PoolCompareControlBar/>
	    			<h1 className='text-dark'>...Pool Comparisons...</h1>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolCompare