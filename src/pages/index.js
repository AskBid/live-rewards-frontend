import React from 'react'
import IntroSchema from '../components/IntroSchema';

function Home() {
    return (
    	<div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className="row mt-3 ml-auto mr-auto d-flex flex-row flex-wrap">

		        	<div className="col-lg text-center mr-5 mt-auto mb-auto">
		        		<h1 className="text-dark text-right mt-5">
		        			<span>See <b>today</b> the <b>rewards</b> you'll receive in 2 epochs.</span>
		        		</h1>
		        		<div className="align-center mb-5" style={{height:'10vh'}}>
		        			<button className="m-0 mt-4 mb-4" style={{'min-width':'250px'}}><b>Live-Rewards</b></button>
		        		</div>
		        	</div>

	        		<div className="col-sm mt-4">
	        			<IntroSchema epochno={262}/>
	        			<IntroSchema epochno={261}/>
	        			<IntroSchema epochno={260} textLeft={'check your rewards now!'} colorLeft={'info'}/>
	        			<IntroSchema epochno={259}/>
	        			<IntroSchema epochno={258}/>
		        	</div>	        	

	        	</div>
	        </div>
	      </div>
	    </div>
    )
}

export default Home
