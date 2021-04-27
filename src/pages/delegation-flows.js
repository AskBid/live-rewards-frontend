import React, { useEffect, useRef } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import chart_delegation_flows from '../helpers/chart_delegation_flows'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import { useSelector, useDispatch } from 'react-redux'

function DelegationFlows({history, match}) {
		const dispatch = useDispatch()
		const delegation_flow = useSelector( state => state.delegation_flow.delegation_flow )
	  const svgRef = useRef();

		useEffect(() => {
	    dispatch(getDelegationFlow()).then(res => {
	    	res && chart_delegation_flows(res, 4, svgRef)
	    })
	  }, []);

	  debugger

    return (
      <div className="w-100 fill d-flex">
        <div className='col'>
        </div>
        <div className="container col-lg-10 h-100 d-flex flex-column">
        	<div className='row mt-4 mb-1'>
        		<PoolToPlotForm history={history} match={match}/>
        		<h5 className='text-muted mt-4 text-center'>{`Delegations flows for ${'EDEN'} pool:`}</h5>
			  	</div>
        	<svg ref={svgRef} className='w-100 h-100 mt-2' style={{minHeight:'600px', minWidth:'600px'}}></svg>
        </div>
        <div className='col'></div>
	    </div>
    )
}

export default DelegationFlows