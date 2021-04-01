import React from 'react'
import StakesTab from '../containers/StakesTab'

function Liverewards() {
    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className='row mt-4 mb-3 mr-auto ml-auto'>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		Add Stake Address
		        	</button>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		₳
		        	</button>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		$
		        	</button>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		€
		        	</button>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		£
		        	</button>
		        	<button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mt-1 mb-0 w-auto' type='Submit'>
		        		¥
		        	</button>
	        	</div>
	          <StakesTab/>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default Liverewards