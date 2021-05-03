import React from 'react'
import StakeTab from './StakeTab'
import Moment from 'moment'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';

const EpochTab = ({epochno, stakes, tabType}) => {

  const last_update = useSelector(state => state.sessions.lastUpdate)

  const epoch_end_date = ((epochno) => {
    const reward_pay = Moment('2020-08-13T21:44:51.000')
    reward_pay.add(5 * ((epochno+1) - 210), 'days')

    const epoch_end = Moment('2020-08-13T21:44:51.000')
    epoch_end.add(5 * ((epochno) - 210), 'days')

    const sec_left = epoch_end.unix() - Moment().unix()
    const five_days_sec = 432000
    const epoch_progress = sec_left > 0 ? ((five_days_sec-sec_left) / five_days_sec) * 100 : 100

    return {
      date: reward_pay.format("ddd Do MMM"), 
      time: reward_pay.format("hh:mmA"),
      epoch_progress: epoch_progress,
    }
  })(epochno)

  const epoch_status = (() => {
    const epoch_passed = stakes[0].epoch_info.current_epoch - epochno
    switch (epoch_passed) {
      case 0:
        return {
          rewards: 'ongoing', 
          epoch: 'in progress',
          color: 'warning',
          opacity: '45%'
        }
      case 1:
        return {
          rewards: 'calculating', 
          epoch: 'ended',
          color: 'info',
          opacity: '55%'
        }
      default:
        return {
          rewards: 'received',
          epoch: 'ended',
          color: 'info',
          opacity: '90%'
        }
    }
  })()

  const findProgressBarWidth = () => {
    if ( last_update.epoch_no === epochno ) {
      //431900 slots per epoch
      return (last_update.epoch_slot_no / 431900)*100
    } 
    return epoch_end_date.epoch_progress
  }

  const deploy_stakes = () => {
    return stakes.map((stake, i) => {
      if (stake.id) {
        return <StakeTab stake={stake} tabType={tabType} key={stake.id}/>
      } else {
        return <div className='w-50'><Skeleton height={120}/></div>
      }
    })
  }

  return (
      <div className='text-light bg-white bg-gradient pt-4 shadow mt-5' style={{borderRadius:'10px 10px 3px 3px'}}>
        <div className='d-flex flex-lg-row flex-wrap'>
          <div className='container col pb-3 pt-0 pl-0 pr-0 align-self-center'>
            <div className='container align-self-center mt-auto mb-auto ml-auto mr-auto d-flex flex-row'>
              <div className='col-4 ml-auto mr-auto align-self-center p-0'>
                <h6 className='text-muted ml-auto mr-auto mb-0 text-center'>epoch</h6>
                <h1 className='text-muted ml-auto mr-auto text-center'>{epochno}</h1>
              </div>
              <div className='col-8 ml-auto mr-auto bg-light rounded align-self-center p-0 align-self-center'>
                  <div className='container w-100 pt-2 pr-3 pl-3 ml-auto text-center align-self-center mr-auto pb-2 flex-md-column' style={{width:'23vw'}}>
                    <div className='row'>
                      <div className='col min-vw-10 pl-auto pr-auto text-center text-nowrap reward-label'>
                        rewards:
                      </div>
                    </div>
                    <div className='row mb-2 mt-0'>
                      <div className='col min-vw-10 pl-auto pr-auto text-muted text-center text-nowrap'>
                        <b>{ epoch_status.rewards }</b>
                      </div>
                    </div>
                    <div className='row'>
                      <span className='col min-vw-10 pl-auto pr-auto text-center text-nowrap reward-label'>
                        delivery:
                      </span>
                    </div>
                    <div className='row d-flex flex-column'>
                      <div className='date col min-vw-10 pl-auto pr-auto text-right text-muted text-center text-nowrap'>
                        {epoch_end_date.date}
                      </div>
                      <div className='date col min-vw-10 pl-auto pr-auto text-right text-muted text-center text-nowrap'>
                        {epoch_end_date.time}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          {deploy_stakes()}
        </div>
        <div className="progress mt-2" style={{height: "8px", opacity: `${epoch_status.opacity}`,  borderRadius:'0px 0px 3px 3px'}}>
          <div className={`progress-bar bg-${epoch_status.color}`} role={'progressbar'} style={{width: `${findProgressBarWidth()}%`, borderRadius:'0px 0px 3px 3px'}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
  )
}

export default EpochTab


