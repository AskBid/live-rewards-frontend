import React from 'react'
import StakesTab from '../containers/StakesTab'
import LiveRewardsControlBar from '../containers/LiveRewardsControlBar'

function LiveRewards({match}) {

    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<LiveRewardsControlBar/>
	          <StakesTab/>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default LiveRewards