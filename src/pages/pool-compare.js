import React from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import UserPoolsBucket from '../containers/UserPoolsBucket'

function PoolCompare({match}) {

    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<PoolCompareControlBar/>
	    			<UserPoolsBucket/>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolCompare