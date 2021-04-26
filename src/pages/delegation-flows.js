import React, { useEffect } from 'react'
import AddPoolForm from '../containers/AddPoolForm'
import chart_delegation_flows from '../helpers/chart_delegation_flows'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import { useSelector, useDispatch } from 'react-redux'

function DelegationFlows() {
		const dispatch = useDispatch()
		useEffect(() => {
	    dispatch(getDelegationFlow())
	  }, []);

    return (
      <div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className='row mt-4 mb-5 mr-auto ml-auto'>
	        		<AddPoolForm />
				  	</div>
	        	<div className='chart-container'></div>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default DelegationFlows