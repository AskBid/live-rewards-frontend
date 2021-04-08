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
import { Link } from 'react-router-dom'

const StakeTab = ({stake}) => { 

  const user = useSelector(state => state.sessions.user)
  const deleting = useSelector(state => {
    return stake.stake_address.id === state.epoch_stakes.deleting_addr_id
  })
  const dispatch = useDispatch()
  const ticker = stake.pool_hash.pool.ticker

  return (
    <div className='col bg-light rounded border border-secondary ml-3 mr-3 mb-3 p-0 d-flex flex-row flex-wrap'>
      <SpinnerDiv className='d-flex justify-content-center'>
        {deleting && 
          <img className='mb-3 mt-0' alt='spinner' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
      </SpinnerDiv>
      <AddrLabel className="text-monospace">...{stake.stake_address.view.slice(-7)}</AddrLabel>
      <div className='flex-row d-flex w-100'>

        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(deleteStakeAddress(user, stake.stake_address.id))
        }}>
          <DeleteBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-auto' style={{width:'2vw'}}>
            <CloseIcon /> 
          </DeleteBtn>
        </form>

        <Link to={`/pool-compare/users/${user}/epoch_stakes/${stake.id}`}>
          <PoolBtn type='Submit' className='mt-auto p-0 mb-auto h-100 ml-auto mr-3' style={{width:'2vw'}}>
            <PoolIcon /> 
          </PoolBtn>
        </Link>

        <div className='col d-flex flex-row flex-wrap m-0 p-0'>
          <div className='col text-dark mt-auto mb-auto'>
            <h2 className='text-dark mt-auto mb-auto'>
              {ticker}
            </h2>
          </div>
          <div className='container col'>
            <div className='ml-auto'>
              <div className='row text-dark rounded d-flex flex-row flex-nowrap bg-white mt-auto mb-auto'>
                <div className='col-sm text-right pr-1 text-nowrap mt-auto mb-auto'>rewards:</div>
                <div className='col-sm mt-auto mb-auto text-right pr-1 text-info text-nowrap font-weight-bold min-vw-10'>
                  <h4 className='mt-auto mb-auto pt-2 pb-2 text-monospace'>
                    ₳{numeral((parseInt(stake.calc_rewards))).format('0,0')}
                  </h4>
                </div>
              </div>
              <div class="dropdown-divider m-0"></div>  
              <div className='row text-dark rounded d-flex flex-row flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap text-muted'>delegation:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>
                  ₳{ numeral((parseInt(stake.amount)/1000000)).format('0,0') }
                </div>
              </div>
              <div class="dropdown-divider m-0"></div>
              <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap'>blocks:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>3/6</div>
              </div>
              <div class="dropdown-divider m-0"></div>
              <div className='row text-dark rounded d-flex flex-row text-muted flex-nowrap'>
                <div className='col-sm text-right pr-1 text-nowrap'>ROS:</div>
                <div className='col-sm text-right pr-1 text-monospace text-muted text-nowrap min-vw-10'>3%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeTab


