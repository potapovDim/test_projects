import moment from 'moment'

function fromNumberToMDY(dateNumber) {
  return moment(dateNumber).format('MMM Do YY')
}

function fromNumberToDateObject() {
  return moment(dateNumber).toDate()
}

function fromMDYToDateObj(dateDMY) {
  return moment(dateDMY, 'MMM Do YY').toDate()
}

export {
  fromMDYToDateObj,
  fromNumberToMDY,
  fromNumberToDateObject
}
