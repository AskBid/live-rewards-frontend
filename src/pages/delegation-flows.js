import React, { useEffect, useRef, useState } from 'react'
import PoolToPlotForm from '../containers/PoolToPlotForm'
import { useSelector, useDispatch } from 'react-redux'
import { getDelegationFlow } from '../actions/delegation_flows.actions'
import chart_delegation_flows from '../helpers/chart_delegation_flows'
import numeral from 'numeral'
import BeatLoader from "react-spinners/BeatLoader";
import {ButtonAdd, ButtonNav} from '../components/ButtonAddElement.js'
import { Link } from 'react-router-dom'


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
    window.scrollTo(0, 0);
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
    ada: '???',
    usd: '$',
    eur: '???',
    gbp: '??',
    jpy: '??',
    btc: '???'
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
            <div className='col text-right text-info'>
              <b>{symbols[currency]}{numeral(parseInt(delegation_flow[pool_hash_id].size*price)).format('0,0')}</b>
            </div>
          </div>
          <div className='row text-nowrap mt-1'>
            <div className='col' style={{fontSize:'0.8em'}}>balance:</div> 
            <div className={`col text-right text-${(from_sum-to_sum) < 0 ? 'danger' : 'primary'}`} style={{fontSize:'0.8em'}}>
              ({(from_sum-to_sum) > 0 ? '+' : null}{numeral(parseInt((from_sum-to_sum)*price)).format('0,0')})
            </div>
          </div>
        </div>
        <div class="container mt-1">
          <div className='row text-nowrap'>
            <div className='col text-right'></div>
            <div className='col text-right mt-4 text-primary'><b>New Delegations From:</b></div>
          </div>
          {Object.keys(from) != 0 && Object.keys(from).map(key => {
            if (key === 'new_delegation') {
              return (
                <div className='row text-nowrap'>
                  <div className='col text-success text-primary'><i className='text-primary'>{'New Wallets'}</i>{' '}<span className='text-primary'>&#8594;</span></div>
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
            <div className='col text-right mt-4 text-danger'><b>Delegation that Left to:</b></div>
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

  const randomPoolPlot = () => {
    const arr = Object.keys(delegation_flow)
    const random_key = arr[Math.floor(Math.random() * arr.length)]
    history.push(`/delegation-flows/epochs/${match.params.epoch_no}/pools/${delegation_flow[random_key].ticker}`)
  }

  return (
    <div className="w-100 fill d-flex flex-column">
      <div className='position-absolute text-muted ml-3 p-2 rounded' style={{top:'83px', background:"rgba(250,250,250,0.6)", overflowY:'scroll'}}>
        <div className='w-100 text-center d-flex flex-row'>
          <ButtonNav onClick={() => history.goBack()} style={{width:'15px'}} className='mb-4 shadow-sm border-0 text-nowrap rounded mr-0 ml-0 d-flex justify-content-center align-items-center' alt='Go Back'>
            <b>&larr;</b>
          </ButtonNav>
          <ButtonAdd className='shadow-sm ml-2 mr-2 mb-1' onClick={randomPoolPlot}> Plot Any Pool </ButtonAdd>
          <ButtonNav onClick={() => history.goForward()} style={{width:'15px'}} className='mb-4 shadow-sm border-0 text-nowrap rounded mr-0 ml-0 d-flex justify-content-center align-items-center' alt='Go Back'>
            <b>&rarr;</b>
          </ButtonNav>
        </div>
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
        <div className={`m-5 w-100 d-flex justify-content-center`} onClick={() => dispatch({type: 'ALERT_CLEAR'})} style={{cursor:'pointer'}}>
          <div className={`alert ${alert.type} w-75`}>
            {alert.message}
          </div>
        </div>
      }
      <div className='d-flex justify-content-center'>
        {loading && 
          <div className='container position-absolute w-100 h-75 pr-5 text-center d-flex justify-content-center align-items-center' style={{zIndex:'15'}}>
            <BeatLoader className='text-center self-align-center' color='#999' size={50}/>
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