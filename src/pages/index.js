import React from 'react'
import IntroSchema from '../components/IntroSchema';
import { Link } from 'react-router-dom'
import Moment from 'moment'

function Home() {

		const epochno = (() => {
	    // const epoch_end = Moment('2020-08-13T21:44:51.000')
	    // epoch_start.subtract(5, 'days')
	    const now = Moment().unix()
	    const epoch_210 = Moment('2020-08-13T21:44:51.000').unix()
	    const diff = now - epoch_210
	    const epochs = diff / (5*60*60*24)
	    return 210 + (Math.ceil(epochs))
	  })()

    return (
    	<div className="container-fluid">
	      <div className="row mb-5">
	        <div className=" col-lg-10 mr-auto ml-auto">
	        	<div className="row mt-3 ml-auto mr-auto d-flex flex-row flex-wrap">

		        	<div className="col-lg text-center p-0 mt-auto mb-auto">
		        		<h1 className="text-dark text-center mt-5">
		        			<span>Check <b>now</b> the <b>rewards</b> you will receive in 2 epochs.</span>
		        		</h1>
		        		<div className="align-center mb-5" style={{height:'10vh'}}>
		        			<Link to='/live-rewards'>
		        				<button className="m-0 mt-4 mb-4" style={{minWidth:'250px'}}>
		        					<b>Live-Rewards</b>
		        				</button>
		        			</Link>
		        		</div>
		        	</div>

	        		<div className="col-sm mt-3 mb-5">
	        			<IntroSchema 
	        				opacity={'40%'} 
	        				current_epoch={epochno} 
	        				epochno={epochno+2} 
	        				textRight={'Rewards Delivery'} 
	        				colorRight={'danger'}/>
	        			<IntroSchema 
	        				opacity={'70%'} 
	        				current_epoch={epochno} 
	        				epochno={epochno+1} 
	        				textRight={'Calculating Rewards'} 
	        				colorRight={'danger'}/>
	        			<IntroSchema 
	        				opacity={'100%'} 
	        				current_epoch={epochno} 
	        				epochno={epochno} 
	        				textLeft={'check your rewards live!'} 
	        				colorLeft={'highlight'} 
	        				textRight={'Active Delegation'} 
	        				colorRight={'primary'}/>
	        			<IntroSchema 
	        				opacity={'100%'} 
	        				current_epoch={epochno} 
	        				epochno={epochno-1} 
	        				textRight={'Stakes Snapshot'} 
	        				colorRight={'primary'}/>
	        			<IntroSchema 
	        				opacity={'100%'} 
	        				current_epoch={epochno} 
	        				epochno={epochno-2} 
	        				textRight={'Sent Delegation'} 
	        				colorRight={'primary'}/>
		        	</div>	        	
	        	</div>
	        </div>
	      </div>
	    </div>
    )
}

export default Home
