import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

    return (
    	<div id="intro" className="row w-100 h-100 d-flex flex-xl-row align-items-center justify-content-center">
    		<div className="col"></div>
      	<div className="col-5 text-center">
      		<h1 className="text-white text-center">
      			<span>Check <b>now</b> the <b>rewards</b> you will receive in 2 epochs.</span>
      		</h1>
      		<div className="align-center" style={{height:'10vh'}}>
      			<Link to='/live-rewards'>
      				<button className="intro m-0 mt-4 mb-4 shadow-sm" style={{minWidth:'250px'}}>
      					<b>Live-Rewards</b>
      				</button>
      			</Link>
      		</div>
      		<div style={{height:'80px'}}>
      			<p className="mt-5 text-white text-center">
	      			<span>#Cardano #ADA</span>
	      		</p>
      		</div>
      	</div>
      	<div className="col"></div>	        	
	    </div>
    )
}

export default Home
