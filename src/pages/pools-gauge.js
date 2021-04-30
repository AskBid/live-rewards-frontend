import React, { useEffect } from 'react'
// import StakesColumn from '../containers/StakesColumn'
// import LiveRewardsControlBar from '../containers/LiveRewardsControlBar'

function PoolsGauge({match}) {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

    return (
      <div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	Pools Gauge
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolsGauge