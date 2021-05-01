import React, { useEffect, useState } from 'react'
import { getPoolPerformances } from '../actions/pool.actions'
import { useSelector, useDispatch } from 'react-redux'
import { groupBy } from 'underscore'
import * as d3 from 'd3'
// import numeral from 'numeral';

function PoolsGauge({match}) {
	const performances = useSelector( state => state.pools.performances )
	const pools = useSelector( state => state.pools.pools )
	const dispatch = useDispatch()

	// const [isVisible, setVisiblity] = useState();

	useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPoolPerformances(20))
  }, []);

  // useEffect(() => {
  // }, [performances]);

  const deployPerformances = () => {
    const by_pool_hash = groupBy(performances, 'pool_hash_id')
    const pools_map = groupBy(pools, 'pool_hash_id')

    return Object.keys(by_pool_hash).map((pool_hash_id) => {
    	return (
	    	<div className='row' key={pool_hash_id}>
	    		<div className='text-monospace bg-info'>{pools_map[pool_hash_id][0].ticker}</div>
	    		<div className='col d-flex flex-inline bg-success'>
	    			{drawPoolGauge(by_pool_hash[pool_hash_id])}
	    		</div>
	    	</div>
    	)
    })
  }

  const drawPoolGauge = (pool_epoch_perfomances) => {

  	return pool_epoch_perfomances.map(epoch => <span className='text-nowrap text-monospace'>{`${epoch.blocks_delta_pc}`.slice(0,5)}{' || '}</span>)
  }

  return (
    <div className="container-fluid mh-100">
      <div className="row mb-5 h-100">
        <div className='col'>
        </div>
        <div className="col-lg-10 mr-auto ml-auto text-monospace">
        	{deployPerformances()}
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default PoolsGauge