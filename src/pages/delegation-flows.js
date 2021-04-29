import React, { useEffect, useRef, useState } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import { useSelector, useDispatch } from 'react-redux'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import chart_delegation_flows from '../helpers/chart_delegation_flows'

function DelegationFlows({history, match}) {
  const dispatch = useDispatch()
  const alert = useSelector( state => state.alert )
  const delegation_flows = useSelector( state => state.delegation_flow.list )
  const loading = useSelector( state => state.delegation_flow.loading )
	const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    if (!delegation_flows[match.params.epoch_no]) {
      dispatch(getDelegationFlow(match.params.epoch_no))
    }
  }, []);

  useEffect(() => {
    const delegation_flow = delegation_flows[match.params.epoch_no]
    if (delegation_flow) {
      const tickersMap = getTickersFromDeleFlow(delegation_flow)
      chart_delegation_flows(
        delegation_flow, 
        tickersMap[match.params.ticker], 
        svgRef.current,
        svgRef.current.clientWidth,
        svgRef.current.clientHeight,
        match.params.epoch_no,
        history)
    }
  }, [delegation_flows, match, dimensions]);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const getTickersFromDeleFlow = (deleFlow) => {
    // in future I should rething the delegation_flow object 
    // to avoid the search of ticker to find pool_hash_id
    let obj = {}
    Object.keys(deleFlow).forEach(pool_hash_id => {
      obj = {...obj, [deleFlow[pool_hash_id].ticker]: pool_hash_id}
    }) 
    return obj
  }

  return (
    <div className="w-100 fill d-flex flex-column">
      <div className='position-fixed mt-4 ml-5 text-muted' style={{top:'100px'}}>
  		    <h5>
              Epoch: <b>{`${match.params.epoch_no}`}</b>
          </h5>
          <h5>
              Pool: <b>{`${match.params.ticker}`}</b>
          </h5>
      </div>
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
      <svg ref={svgRef} className='w-100 h-100 chart'></svg>
    </div>
  )
}

export default DelegationFlows