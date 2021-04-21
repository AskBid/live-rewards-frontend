import React from 'react'
import StakeTab from './StakeTab'
import Moment from 'moment'

const EpochTab = ({epochno, stakes, buttonsOff}) => {

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

  return (
      <div className='text-light bg-white bg-gradient rounded pt-4 shadow mb-5'>
        <div className='align-self-center justify-content-center row m-auto pr-2 pl-2 d-flex flex-row'>
          <div className='pb-3 pt-0 pl-0 pr-0 align-self-center'>
          <div className='align-self-center mt-auto mb-auto ml-4 mr-1 d-flex flex-row flex-wrap'>
            <div className='col ml-1 mr-1 align-self-center'>
              <h6 className='text-muted ml-auto mr-auto mb-0 text-center d-flex justify-content-center'>epoch</h6>
              <h1 className='text-muted ml-auto mr-auto text-center'>{epochno}</h1>
            </div>
            <div className='col ml-1 mr-1 bg-light rounded align-self-center p-0'>
                <div className='container pt-2 pr-3 pl-3 pb-2 flex-md-column justify-content-between' style={{width:'23vw'}}>
                  <div className='row'>
                    <div className='col min-vw-10 pl-auto pr-auto text-center text-muted text-nowrap reward-label'>
                      rewards:
                    </div>
                  </div>
                  <div className='row mb-2 mt-0'>
                    <div className='col min-vw-10 pl-auto pr-auto text-muted text-center text-nowrap'>
                      <b>{ epoch_status.rewards }</b>
                    </div>
                  </div>
                  <div className='row'>
                    <span className='col min-vw-10 pl-auto pr-auto text-center text-muted text-nowrap reward-label'>
                      delivery:
                    </span>
                  </div>
                  <div className='row'>
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
          {stakes.map(stake => <StakeTab stake={stake} buttonsOff={buttonsOff} key={stake.id}/>)}
        </div>
        <div className="progress mt-2" style={{height: "4.5px", opacity: `${epoch_status.opacity}`}}>
          <div className={`progress-bar bg-${epoch_status.color}`} role={'progressbar'} style={{width: `${epoch_end_date.epoch_progress}%`}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
  )
}

export default EpochTab


