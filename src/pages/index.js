import React from 'react'
import IntroSchema from '../components/IntroSchema';

function Home() {
    return (
    	<div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className="row mt-3 d-flex flex-row flex-wrap">

	        		<div className="col-sm">
	        			<IntroSchema/>
	        			<IntroSchema/>
	        			<IntroSchema/>
	        			<IntroSchema/>
	        			<IntroSchema/>
		        	</div>	        	

		        	<div className="col-lg text-center ml-5 mt-auto mb-auto">
		        		<h1 className="text-muted text-left">
		        			<span>See <b>today</b> the <b>rewards</b> you'll receive in 2 epochs.</span>
		        		</h1>
		        		<div className="align-center" style={{height:'10vh'}}>
		        			<button className="mt-4">Live-Rewards</button>
		        		</div>
		        	</div>

	        	</div>
	        </div>
	      </div>
	    </div>
    )
}

export default Home
