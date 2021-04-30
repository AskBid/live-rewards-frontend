import React, { useEffect } from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import PoolComparedStakesColumn from '../containers/PoolComparedStakesColumn'

function PoolCompare({match}) {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

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