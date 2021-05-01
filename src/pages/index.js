import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
		useEffect(() => {
	    window.scrollTo(0, 0);
	  }, []);

    return (
    	<div className="row d-flex align-items-center">
    		<div className="col-3"></div>
      	<div className="col-lg-6 text-center bg-info">
      		<h1 className="text-dark text-center">
      			<span>Check <b>now</b> the <b>rewards</b> you will receive in 2 epochs.</span>
      		</h1>
      		<div className="align-center" style={{height:'10vh'}}>
      			<Link to='/live-rewards'>
      				<button className="m-0 mt-4 mb-4" style={{minWidth:'250px'}}>
      					<b>Live-Rewards</b>
      				</button>
      			</Link>
      		</div>
      	</div>
      	<div className="col-3"></div>	        	
	    </div>
    )
}

export default Home
