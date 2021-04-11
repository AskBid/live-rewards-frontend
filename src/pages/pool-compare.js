import React from 'react'
import PoolCompareControlBar from '../containers/PoolCompareControlBar'
import UserPoolsBucket from '../containers/UserPoolsBucket'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

function PoolCompare({match}) {
    return (
      <div className="container-fluid mh-100 ">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        <Router>
	         	{// only to pass hisotry.location down the components
	         	}
	        	<Route path='/pool-compare' component={PoolCompareControlBar} />
	    			<Route path='/pool-compare' component={UserPoolsBucket} />
	    		</Router>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default PoolCompare