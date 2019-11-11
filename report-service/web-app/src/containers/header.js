import './styles/header.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReporterCalendar} from '../components/calendar'
import {getTestCases} from '../server-client/actions'
import {updateCasesList} from '../reducers/action.creators'
import {Button} from '../components/button'

import {fromMDYToDateObj, fromNumberToDateObject, fromNumberToMDY} from '../utils/date'

class Header extends Component {

  state = {
    fromDateOpen: false,
    toDateOpen: false,
    autosync: false
  }

  toggleCalendar = (name) => {
    this.setState({[name]: !this.state[name]})
  }

  getTestCaseByTime = (hours) => {
    const {dispatch, endDate} = this.props

    const dateRange = {startDate: Date.now() - (3600000 * hours), endDate}

    return getTestCases((casesFromBackend) => {
      const cases = casesFromBackend.filter(function({date}) {
        return dateRange.startDate <= date && date <= dateRange.endDate
      })
      dispatch(updateCasesList(cases))
    })
  }

  enableAutoSync = () => {
    if(this.state.autosync) {
      clearInterval(this.state.autosync)
      this.setState({...this.state, autosync: false})
    } else {
      const autosync = setInterval(this.resyncCases, 5000)
      this.setState({...this.state, autosync})
    }
  }

  resyncCases = () => {
    const {dispatch} = this.props
    return getTestCases((cases) => dispatch(updateCasesList(cases)))
  }

  filterTestCasesByDay = (name, dateObj) => {

    const dateObjNumber = +dateObj
    const {dispatch, startDate, endDate} = this.props
    const dateRange = {startDate, endDate}

    return getTestCases((casesFromBackend) => {

      if(startDate <= dateObjNumber && dateObjNumber <= endDate) {

        dateRange[name] = dateObjNumber

        const cases = casesFromBackend.filter(function({date}) {
          return dateRange.startDate <= date && date <= dateRange.endDate
        })

        dispatch(updateCasesList(cases))

      } else {
        console.log('Date range is out of')
      }
    })
  }

  render() {
    let {startDate, endDate, cases = []} = this.props
    const {fromDateOpen, toDateOpen, autosync} = this.state

    if(cases.length) {
      startDate = startDate ? startDate : cases[0].date
      endDate = endDate ? endDate : cases[cases.length - 1].date
    }

    return (
      <nav className="header">
        <Button title={"Resync cases"} clickAction={this.resyncCases} />
        <Button title={!autosync ? 'Enable autosync' : 'Disable autosync'} clickAction={this.enableAutoSync} />

        <div>Tests count is:  {cases.length}</div>
        <div>
          Get statistic
          <button onClick={() => this.getTestCaseByTime(1)}>Last hour</button>
          <button onClick={() => this.getTestCaseByTime(2)}>Last 2 hours</button>
          <button onClick={() => this.getTestCaseByTime(3)}>Last 3 hours</button>
          <button onClick={() => this.getTestCaseByTime(4)}>Last 4 hours</button>
        </div>
        <div>

          {cases.length && (
            <div>

              <h3>Avaliable date range</h3>
              <div className="date_range">
                <div onClick={() => this.toggleCalendar('fromDateOpen')}>Start date: <span>{fromNumberToMDY(startDate)}</span> </div>
                <div onClick={() => this.toggleCalendar('toDateOpen')}>End date:   <span>{fromNumberToMDY(endDate)}</span>   </div>
              </div>

              <div className="calendar section">
                {fromDateOpen &&
                  <div className="calendar-wrapper">
                    <ReporterCalendar
                      // activeStartDate={fromNumberToDateObject(fromDateOpen)}
                      onChange={(dateObj) => this.filterTestCasesByDay('startDate', dateObj)}
                      title="Choose start date"
                    />
                  </div>
                }
                {
                  toDateOpen &&
                  <div className="calendar-wrapper end-date">
                    <ReporterCalendar
                      // activeStartDate={fromNumberToDateObject(toDateOpen)}
                      onChange={(dateObj) => this.filterTestCasesByDay('endDate', dateObj)}
                      title="Choose end date"
                    />
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default connect(({cases: {cases, count, startDate, endDate}}) => ({cases, count, startDate, endDate}))(Header)
