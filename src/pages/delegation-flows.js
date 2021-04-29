import React, { useEffect, useRef, useState } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import { useSelector, useDispatch } from 'react-redux'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import chart_delegation_flows from '../helpers/chart_delegation_flows'
import numeral from 'numeral'


function DelegationFlows({history, match}) {
  const dispatch = useDispatch()
  const alert = useSelector( state => state.alert )
  const delegation_flow = useSelector( state => state.delegation_flow.list[match.params.epoch_no] )
  const loading = useSelector( state => state.delegation_flow.loading )
	const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });
  const [pool_hash_id, setPoolHashId] = useState();
  const price = useSelector(state => state.sessions.currency.price)
  const currency = useSelector(state => state.sessions.currency.symbol)

  useEffect(() => {
    if (!delegation_flow) {
      dispatch(getDelegationFlow(match.params.epoch_no))
    }
  }, []);

  useEffect(() => {
    if (delegation_flow) {
      const id_from_ticker = getTickersFromDeleFlow(delegation_flow)[match.params.ticker]
      setPoolHashId(id_from_ticker)
      chart_delegation_flows(
        delegation_flow, 
        id_from_ticker, 
        svgRef.current,
        svgRef.current.clientWidth,
        svgRef.current.clientHeight,
        match.params.epoch_no,
        history)
    }
  }, [delegation_flow, match, dimensions]);

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

  const symbols = {
    ada: '₳',
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    btc: '฿'
  }

  const balances = () => {
    const from = delegation_flow[pool_hash_id].from
    const from_sum = Object.values(from).reduce((a,b) => a+b)
    const to = {}
    Object.keys(delegation_flow).forEach((key) => {
      Object.keys(delegation_flow[key].from).forEach((from_key)=>{
        if (from_key === pool_hash_id) {
          to[key] = delegation_flow[key].from[from_key]
        }
      })
    })
    const to_sum = Object.values(to).reduce((a,b) => a+b)

    return (
      <React.Fragment>
      <div class="container">
        <div className='row'>
          <div className='col'>Pool Size:</div> 
          <div className='col text-right text-info'>{symbols[currency]}{numeral(parseInt(delegation_flow[pool_hash_id].size*price)).format('0,0')}</div>
        </div>
        <div className='row'>
          <div className='col'>D.Balance:</div>
          <div className={`col text-right text-${(from_sum-to_sum) < 0 ? 'danger' : 'primary'}`}>{symbols[currency]}{numeral(parseInt((from_sum-to_sum)*price)).format('0,0')}</div>
        </div>
      </div>
      </React.Fragment>
    )
  } 

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
      <div className='position-fixed mt-4 ml-5 text-muted p-2 rounded' style={{top:'100px', background:"rgba(250,250,250,0.6)"}}>
          <div class="container"> 
            <div className='row'>
      		    <div className='col'><h5>Epoch:</h5></div>
              <div className='col text-right text-dark'><b>{`${match.params.epoch_no}`}</b></div>
            </div>
            <div className='row'>
              <div className='col'><h5>Pool:</h5></div>
              <div className='col text-right text-info'><h5><b>{`${match.params.ticker}`}</b></h5></div>
            </div>
          </div>
          {delegation_flow && pool_hash_id && balances()}
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