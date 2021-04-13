import React from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import PoolComparedStakesColumn from '../containers/PoolComparedStakesColumn'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

function PoolCompare({match}) {
    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<PoolCompareControlBar />
	    			<PoolComparedStakesColumn />
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolCompare