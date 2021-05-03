import React from 'react'
import numeral from 'numeral'
import { 
  DeleteBtn,
  PoolBtn,
  CloseIcon, 
  PoolIcon, 
  AddrLabel, 
  SpinnerDiv,
  DeleFlowBtn,
  DeleFlowIcon
} from './StakeTabElements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteStakeAddress } from '../../actions/stake_address.actions';
import { deleteUserPoolHash } from '../../actions/pool_compared_stake.actions';
import { Link } from 'react-router-dom'
import { calcROS } from '../../helpers/calc-ros'
import { ValueRow } from '../ValueRow'
import { RewardsRow } from '../RewardsRow'
import { CLEAR_EPOCH_STAKES } from '../../actions'
import { CLEAR } from '../../actions'
import { ERROR } from '../../actions'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Skeleton from 'react-loading-skeleton';

const StakeTab = ({stake, tabType}) => { 

  const user = useSelector(state => state.sessions.user)
  const currency = useSelector(state => state.sessions.currency.symbol)
  const price = useSelector(state => state.sessions.currency.price)

  const stake_address_id = stake.stake_address && stake.stake_address.id
  const stake_address_view = stake.stake_address && stake.stake_address.view
  const pool_hash_size = stake.pool_hash && stake.pool_hash.size

  const deleting = useSelector(state => {
    if (stake_address_id) {
      return tabType === 'pool-compare' ?
        stake_address_id === state.pool_compared_stakes.deleting_user_pool_hash_id :
        stake_address_id === state.epoch_stakes.deleting_addr_id
    }
  })
  const dispatch = useDispatch()
  const ticker = stake.pool_hash && stake.pool_hash.pool && stake.pool_hash.pool.ticker

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
            dispatch(deleteStakeAddress(user, stake_address_id))
          }}>
            <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'1vw'}}>
              <CloseIcon /> 
            </DeleteBtn>
          </form>

          <OverlayTrigger placement='top' overlay={compareTip}>
            <Link to={`/pool-compare/users/${user}/epoch_stakes/${stake.id}`}>
              <PoolBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto' style={{width:'2.3vw'}}>
                <PoolIcon size={23}/> 
              </PoolBtn>
            </Link>
          </OverlayTrigger>

          <OverlayTrigger placement='top' overlay={delegationFlowTip}>
            <Link to={`/delegation-flows/epochs/${stake.epoch_no}/pools/${ticker}`}>
              <DeleFlowBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2.3vw'}}>
                <DeleFlowIcon size={23}/>
              </DeleFlowBtn>
            </Link>
          </OverlayTrigger>
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
      <div className='d-flex flex-column justify-content-start align-items-start p-2'
        style={{minWidth:'55px',background:'none'}}>
        <DeleteBtn type='Submit' className='w-100 shadow-sm text-center d-flex flex-column justify-content-center align-items-center'>
          <b className='position-absolute' style={{fontSize:'0.9em', top:'-10px'}}>delete</b>
          <CloseIcon size={10}/>
        </DeleteBtn>        
        <PoolBtn type='Submit' className='w-100 h-100 mt-2 shadow-sm'>
          <PoolIcon size={20}/>
        </PoolBtn>        
        <PoolBtn type='Submit' className='w-100 h-100 mt-2 shadow-sm'>
          <DeleFlowIcon size={20}/>
        </PoolBtn>
      </div>
    )
  }

  const whichButtons = () => {
    // switch (tabType) {
    //   case 'live-rewards':
    //     return stakeTabButtons()
    //   case 'pool-compare':
    //     return compareTabButtons()
    //   case 'live-rewards-unregistered':
        return unregisteredTabButtons()
      // default:
      //   return <div style={{width:'1.2em'}}></div>
    // }
  }

  const estimatedBlocks = props => (
    <Tooltip {...props} style={{opacity:'70%', ...props.style}}>
      Those are the estimated blocks this pool should produce based on pool_stake/total_stakes.
      Luck can affect this as much as pool performance.
    </Tooltip>
  );

  const actualBlocks = props => (
    <Tooltip {...props} style={{opacity:'70%', ...props.style}}>
      Those are the blocks effectively produced from the pool at this point.
    </Tooltip>
  );

  const compareTip = props => (
    <Tooltip {...props} style={{opacity:'60%', ...props.style}}>
      Compare this epoch stake with other pools.
    </Tooltip>
  );

  const delegationFlowTip = props => (
    <Tooltip {...props} style={{opacity:'60%', ...props.style}}>
      Look at the flow of delegations for this pool in this epoch.
    </Tooltip>
  );

  const rewards = `${symbols[currency]}${stake.calc_rewards*price < 100 ? numeral(stake.calc_rewards*price).format('0,0.0') : numeral(stake.calc_rewards*price).format('0,0')}`

  return (
    <div className='col bg-light rounded mb-3 p-0 d-flex flex-row flex-wrap shadow-sm'
    style={{border:"2px solid #bcc4cc", borderRadius:"5px"}}>
      <AddrLabel className="text-monospace">...{stake_address_view && stake_address_view.slice(-7)}</AddrLabel>
      <SpinnerDiv className='d-flex justify-content-center'>
        {deleting && 
          <img className='mb-3 mt-0' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
      </SpinnerDiv>
      
      <div className='flex-row d-flex w-100'>

        { whichButtons() }

        <div className='col d-flex flex-row flex-wrap m-0 p-1'>
          <div className='col text-dark text-center m-0 p-0 mt-auto mb-auto mr-auto ml-auto' style={{ minWidth:'7em'}}>
            <h2 className='text-dark mt-auto mb-auto mr-auto ml-auto'>
              {ticker || <Skeleton />}
            </h2>
          </div>
          <div className='container col mb-auto mt-auto mr-1'>
            <div className='ml-auto mb-auto mt-auto'>
              
              {stake.id ? <RewardsRow rewards={rewards} /> : <h3><Skeleton /></h3>}

              <ValueRow 
                label={ 'stake:' }
                symbol={symbols[currency]}
                value={ stake.amount ? numeral(parseInt(stake.amount*price) / 1000000).format('0,0') : undefined }
                skeleton={!stake.id}
              />

              { pool_hash_size ?
                <ValueRow 
                  label={ 'pool size:' }
                  symbol={symbols[currency]}
                  value={ pool_hash_size ? numeral(pool_hash_size*price).format('0,0') : undefined}
                  skeleton={!stake.id}
                /> : null
              }

              <ValueRow 
                label={ 'blocks:' }
                symbol={
                  <OverlayTrigger placement='top' overlay={estimatedBlocks}>
                    <small className='text-monospace'>{`${numeral(stake.estimated_blocks).format('0,0.0')}/ `}</small>
                  </OverlayTrigger>
                }
                value={
                  <OverlayTrigger placement='top' overlay={actualBlocks}>
                    <strong className='text-monospace'>{stake.blocks}</strong>
                  </OverlayTrigger>
                }
                skeleton={!stake.id}
              />
              
              <ValueRow 
                label={ 'ROS:' }
                symbol={numeral(calcROS(stake.amount/1000000, stake.calc_rewards)).format('0,0.00')}
                value={"%"}
                skeleton={!stake.id}
              />
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeTab


