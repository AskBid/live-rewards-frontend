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
	    	debugger
	    })
	  }, []);
	  // console.log(delegation_flow)
    return (
      <div className="container-fluid mh-100">
	      <div className="row mb-5 h-100">
	        <div className='col'>
	        </div>
	        <div className="col-lg-10 mr-auto ml-auto">
	        	<div className='row mt-4 mb-5 mr-auto ml-auto'>
	        		<AddPoolForm noHideButton={true} />
				  	</div>
				  	{delegation_flow && chart_delegation_flows(delegation_flow, 99, svgRef.current)}
	        	<svg ref={svgRef} className='chart-container'></svg>
	        </div>
	        <div className='col'></div>
	      </div>
	    </div>
    )
}

export default DelegationFlows