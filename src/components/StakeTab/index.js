import React from 'react'
import numeral from 'numeral'
import { 
  DeleteBtn,
  PoolBtn,
  CloseIcon, 
  PoolIcon, 
  AddrLabel, 
  SpinnerDiv 
} from './StakeTabElements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteStakeAddress } from '../../actions/stake_address.actions';
import { deleteUserPoolHash } from '../../actions/pool_compared_stake.actions';
import { Link } from 'react-router-dom'
import { calcROS } from '../../helpers/calc-ros'
import { ValueRow } from '../ValueRow'
import { CLEAR_EPOCH_STAKES } from '../../actions'

const StakeTab = ({stake, buttonsOff, compareTab}) => { 

  const user = useSelector(state => state.sessions.user)
  const currency = useSelector(state => state.sessions.currency.symbol)
  const price = useSelector(state => state.sessions.currency.price)
  const deleting = useSelector(state => {
    return compareTab ? 
      stake.stake_address.id === state.pool_compared_stakes.deleting_user_pool_hash_id :
      stake.stake_address.id === state.epoch_stakes.deleting_addr_id
  })
  const dispatch = useDispatch()
  const ticker = stake.pool_hash.pool && stake.pool_hash.pool.ticker

  const symbols = {
    ada: '₳',
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    btc: '฿'
  }

  const stakeTabButtons = () => {
    return (
      <React.Fragment>
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch(deleteStakeAddress(user, stake.stake_address.id))
          }}>
            <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
              <CloseIcon /> 
            </DeleteBtn>
          </form>

          <Link to={`/pool-compare/users/${user}/epoch_stakes/${stake.id}`}>
            <PoolBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2.3vw'}}>
              <PoolIcon size={25}/> 
            </PoolBtn>
          </Link>
      </React.Fragment>
    )
  }

  const compareTabButtons = () => {
    return (
      <React.Fragment>
        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(deleteUserPoolHash(stake.user_pool_hash_id))
        }}>
          <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
            <CloseIcon /> 
          </DeleteBtn>
        </form>
      </React.Fragment>
    )
  }

  const unregisteredTabButtons = () => {
    return (
      <React.Fragment>
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch({type: CLEAR_EPOCH_STAKES})
          }}>
            <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
              <CloseIcon /> 
            </DeleteBtn>
          </form>

          <Link to={`/not-available`}>
            <PoolBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2.3vw'}}>
              <PoolIcon size={25}/> 
            </PoolBtn>
          </Link>
      </React.Fragment>
    )
  }

  return (
    <div className='col bg-light rounded border border-secondary ml-3 mr-3 mb-3 p-0 d-flex flex-row flex-wrap shadow-sm'>
      <AddrLabel className="text-monospace">...{stake.stake_address.view && stake.stake_address.view.slice(-7)}</AddrLabel>
      <SpinnerDiv className='d-flex justify-content-center'>
        {deleting && 
          <img className='mb-3 mt-0' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
      </SpinnerDiv>
      
      <div className='flex-row d-flex w-100'>

        {!buttonsOff ? (compareTab ? compareTabButtons() : stakeTabButtons()) : <div style={{width:'1.2em'}}></div>}

        <div className='col d-flex flex-row flex-wrap m-0 p-1'>
          <div className='col text-dark text-center m-0 p-0 mt-auto mb-auto mr-auto ml-auto' style={{ minWidth:'7em'}}>
            <h2 className='text-dark mt-auto mb-auto mr-auto ml-auto'>
              {ticker}
            </h2>
          </div>
          <div className='container col'>
            <div className='ml-auto'>

              <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
                <div className='col-sm text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
                <div className='col-sm mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold min-vw-10' style={{ minWidth:'8.5em'}}>
                  <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace'>
                    {symbols[currency]}{numeral(stake.calc_rewards).format('0,0')}
                  </h4>
                </div>
              </div>

              {<ValueRow 
                label={ 'stake:' }
                symbol={symbols[currency]}
                value={ numeral(parseInt(stake.amount) / 1000000).format('0,0') }
              />}

              {stake.pool_hash.size ? 
                <ValueRow 
                  label={ 'pool size:' }
                  symbol={symbols[currency]}
                  value={ numeral(stake.pool_hash.size).format('0,0') }
                /> : null
              }

              {<ValueRow 
                label={ 'blocks:' }
                symbol={<small className='text-monospace'>{`${numeral(stake.estimated_blocks).format('0,0.0')}/ `}</small>}
                value={<strong className='text-monospace'>{stake.blocks}</strong>}
              />}

              {<ValueRow 
                label={ 'ROS:' }
                symbol={numeral(calcROS(stake.amount/1000000, stake.calc_rewards)).format('0,0.00')}
                value={'%'}
              />}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeTab


