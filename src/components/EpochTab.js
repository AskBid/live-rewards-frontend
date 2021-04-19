import React from 'react'
import StakeTab from './StakeTab'
import Moment from 'moment'

const EpochTab = ({epochno, stakes, buttonsOff}) => {

  const epoch_end_date = (epochno) => {
    const m = Moment('2020-08-13T21:44:51.000')
    m.add(5 * (260-210), 'days')
    return {date: m.format("ddd Do MMM"), time: m.format("hh:mmA")}
  }

  const epoch_status = () => {
    const epoch_passed = stakes[0].epoch_info.current_epoch - epochno
    switch (epoch_passed) {
      case 0:
        return {
          rewards: 'ongoing', 
          epoch: 'in progress'
        }
      case 1:
        return {
          rewards: 'calculating', 
          epoch: 'ended'
        }
      default:
        return {
          rewards: 'received',
          epoch: 'ended'
        }
    }
  } 

  return (
      <div className='text-light bg-white bg-gradient rounded pt-4 shadow mb-5'>
        <div className='align-self-center justify-content-center row m-auto pr-2 pl-2 d-flex flex-row'>
          <div className='pb-3 pt-0 pl-0 pr-0 align-self-center'>
          <div className='align-self-center mt-auto mb-auto ml-4 mr-1 d-flex flex-row flex-wrap'>
            <div className='col ml-1 mr-1 align-self-center'>
              <h6 className='text-muted ml-auto mr-auto mb-0 text-center d-flex justify-content-center'>epoch</h6>
              <h1 className='text-muted ml-auto mr-auto text-center'>{epochno}</h1>
            </div>
            <div className='col ml-1 mr-1 bg-light rounded align-self-center p-0' style={{'min-width':'13em'}}>
                <div className='container pt-2 pr-3 pl-3 pb-2 flex-md-column justify-content-between'>
                  <div className='row'>
                    <div className='col-6 min-vw-10 pl-auto pr-auto text-right text-muted text-nowrap reward-label'>
                      rewards:
                    </div>
                    <div className='col min-vw-10 pl-auto pr-auto text-muted text-right text-nowrap'>
                      <b>{ epoch_status()['rewards'] }</b>
                    </div>
                  </div>
                  <div className='row'>
                    <span className='col-6 min-vw-10 pl-auto pr-auto text-right text-muted text-nowrap reward-label'>
                      delivery:
                    </span>
                  </div>
                  <div className='row'>
                    <div className='date col text-monospace min-vw-10 pl-auto pr-auto text-right text-muted text-center text-nowrap'>
                      {epoch_end_date(epochno).date}
                    </div>
                    <div className='date col text-monospace min-vw-10 pl-auto pr-auto text-right text-muted text-center text-nowrap'>
                      {epoch_end_date(epochno).time}
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
          {stakes.map(stake => <StakeTab stake={stake} buttonsOff={buttonsOff}/>)}
        </div>
        <div className="progress mt-2" style={{height: "3px"}}>
          <div className="progress-bar bg-info" role={'progressbar'} style={{width: '60%'}} aria-valuenow={"50"} aria-valuemin={"0"} aria-valuemax={"100"}></div>
        </div>
      </div>
  )
}

export default EpochTab


