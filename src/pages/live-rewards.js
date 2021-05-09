import React, { useEffect } from 'react'
import StakesColumn from '../containers/StakesColumn'
import AddStakeForm from '../components/AddStakeForm'

function LiveRewards({match}) {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

    return (
      <div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto pt-3">
	        	<AddStakeForm match={match}/>
	          <StakesColumn match={match}/>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default LiveRewards