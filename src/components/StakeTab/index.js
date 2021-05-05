import React from 'react'
import numeral from 'numeral'
import { 
  DeleteBtn,
  FuncBtn,
  CloseIcon, 
  PoolIcon, 
  AddrLabel, 
  SpinnerDiv,
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
import BeatLoader from "react-spinners/BeatLoader";

const StakeTab = ({stake, buttonType}) => { 

  const user = useSelector(state => state.sessions.user)
  const currency = useSelector(state => state.sessions.currency.symbol)
  const price = useSelector(state => state.sessions.currency.price)
  const loading = useSelector(state => state.epoch_stakes.loading)

  const stake_address_id = stake.stake_address && stake.stake_address.id
  const stake_address_view = stake.stake_address && stake.stake_address.view
  const pool_hash_size = stake.pool_hash && stake.pool_hash.size

  const deleting = useSelector(state => {
    // if (stake_address_id) {
    //   return tabType === 'pool-compare' ?
    //     stake_address_id === state.pool_compared_stakes.deleting_user_pool_hash_id :
    //     stake_address_id === state.epoch_stakes.deleting_addr_id
    // }
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

  const deleteBtn = (deleteFunc) => {
    return (
      <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(deleteFunc(user, stake_address_id))
        }}
        className='w-100'>
        <DeleteBtn type='Submit' className='w-100 text-center mt-0 mb-1 d-flex flex-column justify-content-center align-items-center' disabled={!stake.id || loading || !stake_address_id}>
          <b className='position-absolute' style={{fontSize:'0.9em', top:'-1.5em'}}>Delete!</b>
          { !(!stake.id || loading || !stake_address_id) && <CloseIcon size={14}/> }
        </DeleteBtn>
      </form>
    )
  }

  const poolCompareBtn = () => {
    return (
      <Link to={`/pool-compare/epoch_stakes/${stake.id}`} className='w-100 h-100 mt-1 mb-1'>
        <OverlayTrigger placement='top' overlay={compareTip}>     
          <FuncBtn type='Submit' className='w-100 h-100 shadow-sm' disabled={!stake.id || loading}>
            <PoolIcon size={20}/>{/*<br/><div style={{fontSize:'0.8em'}}>Pool-Compare</div>*/}
          </FuncBtn>
        </OverlayTrigger>
      </Link>
    )
  }

  const buttons = () => {
    return (
      <div className='d-flex flex-column justify-content-start align-items-start p-2' style={{minWidth:'55px',background:'none'}}>

        {buttonType == 3 && deleteBtn(deleteStakeAddress)}
        {/*{buttonType == 2 && deleteBtn(deleteUserPoolHash)}*/}

        {buttonType == 3 && poolCompareBtn()}
      
        <Link to={`/delegation-flows/epochs/${stake.epoch_no}/pools/${ticker}`} className='w-100 h-100 mt-1 mb-1 shadow-sm'> 
          <OverlayTrigger placement='bottom' overlay={delegationFlowTip}>   
          <FuncBtn type='Submit' className='w-100 h-100 shadow-sm' disabled={!stake.id || loading}>
            <DeleFlowIcon size={20}/>
          </FuncBtn>
          </OverlayTrigger>
        </Link>
        
      </div>
    )
  }

  const estimatedBlocks = props => (
    <Tooltip {...props} style={{opacity:'80%', ...props.style}}>
      Estimated blocks.
    </Tooltip>
  );

  const actualBlocks = props => (
    <Tooltip {...props} style={{opacity:'80%', ...props.style}}>
      Blocks produced.
    </Tooltip>
  );

  const compareTip = props => (
    <Tooltip {...props} style={{opacity:'80%', ...props.style}}>
      {/*Compare this epoch stake with other pools.*/}
      Pool-Compare <br/> this epoch stake
    </Tooltip>
  );

  const delegationFlowTip = props => (
    <Tooltip {...props} style={{opacity:'80%', ...props.style}}>
      Look at the flow of delegations for this pool.
    </Tooltip>
  );

  const rewards = `${symbols[currency]}${stake.calc_rewards*price < 100 ? numeral(stake.calc_rewards*price).format('0,0.0') : numeral(stake.calc_rewards*price).format('0,0')}`

  return (
    <div className='col rounded mb-3 p-0 d-flex flex-row flex-wrap shadow-sm'
    style={{border:"2px solid rgba(0, 113, 225, 0.4)", borderRadius:"5px", background:'rgb(247,246,246)'}}>
      <AddrLabel className="text-monospace">...{stake_address_view && stake_address_view.slice(-7)}</AddrLabel>
      <SpinnerDiv className='d-flex justify-content-center'>
        {deleting && 
          <BeatLoader color='#fff' size={18} className='mb-3 mt-0'/>
        }
      </SpinnerDiv>
      
      <div className='flex-row d-flex w-100'>

        { buttons() }

        <div className='col d-flex flex-row flex-wrap m-0 p-1'>
          <div className='col text-dark text-center m-0 p-0 mt-auto mb-auto mr-auto ml-auto' style={{ minWidth:'7em'}}>
            <h2 className='text-dark mt-auto mb-auto mr-auto ml-auto'>
              {(ticker && !loading) ? ticker : <Skeleton />}
            </h2>
          </div>
          <div className='container col mb-auto mt-auto mr-1'>
            <div className='ml-auto mb-auto mt-auto'>
              
              {(stake.id && !loading) ? <RewardsRow rewards={rewards} /> : <h3><Skeleton /></h3>}

              <ValueRow 
                label={ 'stake:' }
                symbol={symbols[currency]}
                value={ stake.amount ? numeral(parseInt(stake.amount*price) / 1000000).format('0,0') : undefined }
                skeleton={!stake.id || loading}
              />

              { pool_hash_size ?
                <ValueRow 
                  label={ 'pool size:' }
                  symbol={symbols[currency]}
                  value={ pool_hash_size ? numeral(pool_hash_size*price).format('0,0') : undefined}
                  skeleton={!stake.id || loading}
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
                skeleton={!stake.id || loading}
              />
              
              <ValueRow 
                label={ 'ROS:' }
                symbol={numeral(calcROS(stake.amount/1000000, stake.calc_rewards)).format('0,0.00')}
                value={"%"}
                skeleton={!stake.id || loading}
              />
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeTab


