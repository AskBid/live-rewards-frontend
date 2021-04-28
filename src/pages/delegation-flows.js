import React, { useEffect, useRef } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import { useSelector, useDispatch } from 'react-redux'

function DelegationFlows({history, match}) {
    const dispatch = useDispatch()
    const alert = useSelector( state => state.alert )
	const svgRef = useRef();

    return (
      <div className="w-100 fill d-flex">
        <div className='col'>
        </div>
        <div className="container col-lg-10 h-100 d-flex flex-column">
        	<div className='row mt-4 mb-1'>
        		<PoolToPlotForm history={history} match={match} svg={svgRef} />
                <div className='position-absolute mt-4 text-muted' style={{top:'50px'}}>
                    {/*<h5>Delegations flows</h5>*/}
            		<h5>
                        Epoch: <b>{`${match.params.epoch_no}`}</b>
                    </h5>
                    <h5>
                        Pool: <b>{`${match.params.ticker}`}</b>
                    </h5>
                </div>
			</div>
            { alert.message &&
              <div className={`w-100 d-flex justify-content-center`} onClick={() => dispatch({type: 'ALERT_CLEAR'})} style={{cursor:'pointer'}}>
              <div className={`alert ${alert.type} w-75`}>
                {alert.message}
              </div>
              </div>
            }
        	<svg ref={svgRef} className='w-100 h-100 mt-2' style={{minHeight:'600px', minWidth:'600px'}}></svg>
        </div>
        <div className='col'></div>
	    </div>
    )
}

export default DelegationFlows