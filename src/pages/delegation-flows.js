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
    const from_sum = Object.values(from).length > 0 ? Object.values(from).reduce((a,b) => a+b) : 0
    const to = {}
    Object.keys(delegation_flow).forEach((key) => {
      Object.keys(delegation_flow[key].from).forEach((from_key)=>{
        if (from_key === pool_hash_id) {
          to[key] = delegation_flow[key].from[from_key]
        }
      })
    })
    const to_sum = Object.values(to).length > 0 ? Object.values(to).reduce((a,b) => a+b) : 0
    return (
      <React.Fragment>
        <div class="container">
          <div className='row text-nowrap'>
            <div className='col'>Pool Size:</div> 
            <div className='col text-right text-info'>{symbols[currency]}{numeral(parseInt(delegation_flow[pool_hash_id].size*price)).format('0,0')}</div>
          </div>
          <div className='row text-nowrap'>
            <div className='col'>D.Balance:</div>
            <div className={`col text-right text-${(from_sum-to_sum) < 0 ? 'danger' : 'primary'}`}>{symbols[currency]}{numeral(parseInt((from_sum-to_sum)*price)).format('0,0')}</div>
          </div>
        </div>
        <div class="container mt-1">
          <div className='row text-nowrap'>
            <div className='col text-right'></div>
            <div className='col text-right'>in:</div>
          </div>
          {Object.keys(from) != 0 && Object.keys(from).map(key => {
            if (key === 'new_delegation') {
              return (
                <div className='row text-nowrap'>
                  <div className='col text-success'>{'New D.'}{' '}&#8594;</div>
                  <div className='col text-right text-primary'>{symbols[currency]}{numeral(parseInt(from[key]*price)).format('0,0')}</div>
                </div>
              )
            } else {
              return from_value(delegation_flow[key].ticker, from[key])
            }
          })}
        </div>
        <div class="container mt-1">
          <div className='row text-nowrap'>
            <div className='col text-right'></div>
            <div className='col text-right'>out:</div>
          </div>
          {Object.keys(to) != 0 && Object.keys(to).map(key => to_value(delegation_flow[key].ticker, to[key]))}
        </div>
      </React.Fragment>
    )
  } 

  const from_value = (ticker, value) => {
    return (
      <div className='row text-nowrap'>
        <div className='col text-primary'><b>{ticker}</b>{' '}&#8594;</div>
        <div className='col text-right text-primary'>{symbols[currency]}{numeral(parseInt(value*price)).format('0,0')}</div>
      </div>
    )
  }

  const to_value = (ticker, value) => {
    return (
      <div className='row text-nowrap'>
        <div className='col text-danger'><b>{ticker}</b>{' '}&#8592;</div>
        <div className='col text-right text-danger'>{symbols[currency]}{numeral(parseInt(value*price)).format('0,0')}</div>
      </div>
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
      <div className='position-absolute text-muted ml-3 p-2 rounded' style={{top:'100px', background:"rgba(250,250,250,0.6)", overflowY:'scroll'}}>
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
      <div className='w-100 h-100 d-flex flex-row'>
        <div className='filler'></div>
        <svg ref={svgRef} className='w-100 h-100 chart' style={{minWidth:'600px'}}></svg>
      </div>
    </div>
  )
}

export default DelegationFlows