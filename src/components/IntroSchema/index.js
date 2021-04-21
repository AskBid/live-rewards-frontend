import React from 'react'
import {Link} from 'react-router-dom'
import { LinkText } from './IntroSchemaElements'

function IntroSchema({epochno, textRight, textLeft, colorLeft, colorRight, opacity}) {
    return (
    	<div className="row mt-3 d-flex flex-nowrap align-content-stretch align-content-center">

    		<div className={`text-right text-${colorLeft} mt-auto mb-auto col mr-3`}>
      		<LinkText to='/live-rewards'>{textLeft}</LinkText>
      	</div>	        	

      	<div className="col"  style={{opacity:`${opacity}`}}>
      		<div className='text-light bg-white bg-gradient rounded p-0 shadow'>
		        <div className='align-self-center justify-content-center row m-0 p-0 d-flex flex-row'>
		          <div className='container align-self-center m-0 d-flex flex-column'>
								<div style={{ opacity: '60%', minWidth: '12vw'}}>
			            <div className="reward-label row text-muted text-left pl-1">day 5</div>
			            <div className="dropdown-divider m-0"></div>  
			            <div className="reward-label row text-muted text-left pl-1">day 4</div>
			            <div className="dropdown-divider m-0"></div>  
			            <div className="reward-label row text-muted text-left pl-1">day 3</div>
			            <div className="dropdown-divider m-0"></div>  
			            <div className="reward-label row text-muted text-left pl-1">day 2</div>
			            <div className="dropdown-divider m-0"></div>  
			            <div className="reward-label row text-muted text-left pl-1">day 1</div>
		            </div>
		            <div className='position-absolute col mt-3 ml-1 mr-1 align-self-center'>
		              <h6 className='text-muted ml-auto mr-auto mb-0 text-center d-flex justify-content-center'>epoch</h6>
		              <h1 className='text-muted ml-auto mr-auto text-center'>{epochno}</h1>
		            </div>
		          </div>
		        </div>
		        <div className="progress mt-0" style={{height: "4.5px", opacity: "90"}}>
		          <div className="progress-bar bg-info" role={'progressbar'} style={{width: `60%`}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
		        </div>
		      </div>
      	</div>

      	<div className={`text-left text-${colorRight} col ml-3 mt-auto mb-auto`}>
      		{textRight}
      	</div>

    	</div>
    )
}

export default IntroSchema