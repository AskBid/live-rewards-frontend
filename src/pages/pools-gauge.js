import React, { useEffect, useState } from 'react'
import { getPoolPerformances } from '../actions/pool.actions'
import { useSelector, useDispatch } from 'react-redux'
import { groupBy } from 'underscore'

function PoolsGauge({match}) {
	const performances = useSelector( state => state.pools.performances )
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
    return Object.keys(by_pool_hash).map((pool_hash_id) => {
    	return (
	    	<div className='row' key={pool_hash_id}>
	    		<div className='col'>{pool_hash_id}</div>
	    		<div className='col d-flex flex-inline'>
	    			{by_pool_hash[pool_hash_id].map(epoch => <span className='text-nowrap'>{epoch.blocks_delta_pc}{' || '}</span>)}
	    		</div>
	    	</div>
    	)
    })
  }

  return (
    <div className="container-fluid mh-100">
      <div className="row mb-5 h-100">
        <div className='col'>
        </div>
        <div className="col-lg-10 mr-auto ml-auto">
        	{deployPerformances()}
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default PoolsGauge