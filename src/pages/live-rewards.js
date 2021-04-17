import React from 'react'
import StakesColumn from '../containers/StakesColumn'
import LiveRewardsControlBar from '../containers/LiveRewardsControlBar'

function LiveRewards({match}) {

    return (
      <div className="container-fluid mh-100 ">
    	<p>{process.env.REACT_APP_API_URL}</p>
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<LiveRewardsControlBar/>
	          <StakesColumn/>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default LiveRewards