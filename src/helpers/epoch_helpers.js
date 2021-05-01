import Moment from 'moment'

export const current_epoch = () => {
  // const epoch_end = Moment('2020-08-13T21:44:51.000')
  // epoch_start.subtract(5, 'days')
  const now = Moment().unix()
  const epoch_210 = Moment('2020-08-13T21:44:51.000').unix()
  const diff = now - epoch_210
  const epochs = diff / (5*60*60*24)
  return 210 + (Math.ceil(epochs))
}