import React, { useEffect, useRef } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import { useSelector, useDispatch } from 'react-redux'

function DelegationFlows({history, match}) {
    const dispatch = useDispatch()
    const alert = useSelector( state => state.alert )
    const loading = useSelector( state => state.delegation_flow.loading )
	const svgRef = useRef();

    return (
      <div className="w-100 fill d-flex">
        <div className='position-fixed w-100 mt-4 mb-1'>
            <div className='col'>
            </div>
            <div className="container col-lg-10 h-100 d-flex flex-column">
                <PoolToPlotForm history={history} match={match} svg={svgRef} />
                <div className='mt-4 text-muted' style={{top:'50px'}}>
                    {/*<h5>Delegations flows</h5>*/}
                    <h5>
                        Epoch: <b>{`${match.params.epoch_no}`}</b>
                    </h5>
                    <h5>
                        Pool: <b>{`${match.params.ticker}`}</b>
                    </h5>
                </div>
            </div>
            <div className='col'>
            </div>
        </div>

        <div className='col'>
        </div>
        <div className="container col-lg-10 h-100 d-flex flex-column">
            { alert.message &&
              <div className={`w-100 d-flex justify-content-center`} onClick={() => dispatch({type: 'ALERT_CLEAR'})} style={{cursor:'pointer'}}>
              <div className={`alert ${alert.type} w-75`}>
                {alert.message}
              </div>
              </div>
            }
            <div className='d-flex justify-content-center'>
              {loading && 
                <div className='spinner border rounded d-flex justify-content-center vw-50 vh-50'>
                    <img className='mb-3 mt-auto mb-auto' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
              }
            </div>
        	<svg ref={svgRef} className='w-100 h-100' style={{marginTop:'80px', minHeight:'600px', minWidth:'600px'}}></svg>
        </div>
        <div className='col'></div>
	    </div>
    )
}

export default DelegationFlows