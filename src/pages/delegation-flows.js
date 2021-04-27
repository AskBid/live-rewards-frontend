import React, { useEffect, useRef } from 'react'
import AddPoolForm from '../containers/AddPoolForm'
import chart_delegation_flows from '../helpers/chart_delegation_flows'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import { useSelector, useDispatch } from 'react-redux'

function DelegationFlows() {
		const dispatch = useDispatch()
		const delegation_flow = useSelector( state => state.delegation_flow.delegation_flow )
	  const svgRef = useRef();
		useEffect(() => {
	    dispatch(getDelegationFlow()).then(res => {
				// debugger
	    	res && chart_delegation_flows(res, 99, svgRef)
	    })
	  }, []);
	  // console.log(delegation_flow)
    return (
      <div className="w-100 fill d-flex">
	        <div className='col'>
	        </div>
	        <div className="container col-lg-10 h-100 d-flex flex-column">
	        	<div className='row mt-4 mb-1'>
	        		<AddPoolForm noHideButton={true} />
				  	</div>
	        	<svg ref={svgRef} className='border w-100 h-100' style={{minHeight:'400px', minWidth:'400px'}}></svg>
	        </div>
	        <div className='col'></div>
	    </div>
    )
}

export default DelegationFlows