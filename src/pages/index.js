import React from 'react'
import IntroSchema from '../components/IntroSchema';
import { Link } from 'react-router-dom'

function Home() {
    return (
    	<div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className="row mt-3 ml-auto mr-auto d-flex flex-row flex-wrap">

		        	<div className="col-lg text-center mr-5 mt-auto mb-auto">
		        		<h1 className="text-dark text-center mt-5">
		        			<span>Check <b>now</b> the <b>rewards</b> you'll receive in 2 epochs.</span>
		        		</h1>
		        		<div className="align-center mb-5" style={{height:'10vh'}}>
		        			<Link to='/live-rewards'>
		        				<button className="m-0 mt-4 mb-4" style={{minWidth:'250px'}}>
		        					<b>Live-Rewards</b>
		        				</button>
		        			</Link>
		        		</div>
		        	</div>

	        		<div className="col-sm mt-3">
	        			<IntroSchema epochno={262} textRight={'Rewards Delivery'} colorRight={'danger'}/>
	        			<IntroSchema epochno={261} textRight={'Calculating Rewards'} colorRight={'danger'}/>
	        			<IntroSchema epochno={260} textLeft={'check your rewards live!'} colorLeft={'highlight'} textRight={'Active Delegation'} colorRight={'primary'}/>
	        			<IntroSchema epochno={259} textRight={'Stakes Snapshot'} colorRight={'primary'}/>
	        			<IntroSchema epochno={258} textRight={'Sent Delegation'} colorRight={'primary'}/>
		        	</div>	        	

	        	</div>
	        </div>
	      </div>
	    </div>
    )
}

export default Home
