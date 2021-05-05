import React, { useEffect } from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import PoolComparedStakesColumn from '../containers/PoolComparedStakesColumn'
import AddPoolForm from '../containers/AddPoolForm'
import MovingText from '../components/MovingText'

function PoolCompare({match}) {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

	  const movingText = () => {
	    return (
	      <>
	      	<b>&uarr; Enter</b> a Pool TICKER to compare <b>this Delegation Rewards</b> to that of another Pool.
	      </>
	    )
	  }


    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto pt-3">
	        	<AddPoolForm match={match}/>
	        	<MovingText textElement={movingText()} />
	    			<PoolComparedStakesColumn />
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolCompare