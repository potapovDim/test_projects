import '../styles/header.css'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReporterCalendar} from '../components/calendar'

import {updateDateRenge} from '../reducers/cases'

import {
  fromMDYToDateObj,
  fromNumberToDateObject,
  fromNumberToMDY
} from '../utils/date'

class Header extends Component {

  state = {
    fromDateOpen: false,
    toDateOpen: false
  }

  toggleCalendar = (name) => {
    this.setState({[name]: !this.state[name]})
  }

  filterTestCasesByDay = (name, dateObj) => {
    const dateObjNumber = +dateObj
    const {dispatch, startDate, endDate} = this.props
    const dateRange = {startDate, endDate}

    if(startDate <= dateObjNumber && dateObjNumber <= endDate) {
      dateRange[name] = dateObjNumber
      dispatch(updateDateRenge(dateRange))
    } else {
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }
  }

  render() {
    const {count = 0, startDate, endDate} = this.props
    const {fromDateOpen, toDateOpen} = this.state

    console.log(startDate, endDate)

    return (
      <nav className="header">
        <h2>
          Header fragment
        </h2>
        <span>Tests count is:  {count}</span>
        <div>

          {count && (
            <div>
              Avaliable date range
              <div onClick={() => this.toggleCalendar('fromDateOpen')}>Start date: <span>{fromNumberToMDY(startDate)}</span> </div>
              <div onClick={() => this.toggleCalendar('toDateOpen')}>End date:   <span>{fromNumberToMDY(endDate)}</span>   </div>

              <div className="calendar section">
                {fromDateOpen && <ReporterCalendar
                  // activeStartDate={fromNumberToDateObject(fromDateOpen)}
                  onChange={(dateObj) => this.filterTestCasesByDay('startDate', dateObj)}
                  title="Choose start date"
                />}
                {toDateOpen && <ReporterCalendar
                  // activeStartDate={fromNumberToDateObject(toDateOpen)}
                  onChange={(dateObj) => this.filterTestCasesByDay('endDate', dateObj)}
                  title="Choose end date"
                />}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default connect(({cases: {count, startDate, endDate}}) => ({count, startDate, endDate}))(Header)
