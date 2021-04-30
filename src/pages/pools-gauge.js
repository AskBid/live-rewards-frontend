import React, { useEffect } from 'react'
import { getPoolPerformances } from '../actions/pool.actions'
import { useSelector, useDispatch } from 'react-redux'

function PoolsGauge({match}) {
	const performances = useSelector( state => state.pools.performances )
	const dispatch = useDispatch()

	useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPoolPerformances(20))
  }, []);

  return (
    <div className="container-fluid mh-100">
      <div className="row mb-5 h-100">
        <div className='col'>
        </div>
        <div className="col-lg-10 mr-auto ml-auto">
        	{performances.map(performance => <p>{performance.blocks_delta_pc}</p>)}
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default PoolsGauge