import './styles/header.css'

import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import {connect} from 'react-redux'
import {ReporterCalendar} from '../components/calendar'
import {getTestCases} from '../server-client/actions'
import {updateCasesList} from '../reducers/action.creators'
import {Button} from '../components/button'
import {InformationMessage} from '../components/information.message'

import {fromNumberToMDY} from '../utils/date'

class Header extends Component {

  state = {
    fromDateOpen: false,
    toDateOpen: false,
    autosync: false,
    messages: []
  }

  UNSAFE_componentWillMount() {
    PubSub.subscribe('buildInfo_warning', (ms, data) => {
      console.warn(ms)
      this.setState({
        ...this.state,
        messages: [...this.state.messages, data]
      })
    })
  }

  renderMessages = () => {

    const {messages} = this.state

    return messages.map((messageInfo, index) => {

      const removeMessage = () => {
        const newState = {...this.state}
        newState.messages.splice(index, 1)
        this.setState({...newState})
      }

      // automremoving error message
      setTimeout(removeMessage, 30 * 1000 * (index + 1))

      return (
        <InformationMessage
          key={index}
          clickAction={removeMessage}
          {...messageInfo}
        />
      )
    })
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
        {this.renderMessages()}
        <Button
          title={"Resync cases"}
          clickAction={this.resyncCases}
        />
        <Button
          title={!autosync ? 'Enable autosync' : 'Disable autosync'}
          className={autosync ? 'active' : ''}
          clickAction={this.enableAutoSync}
        />

        <div>Tests count is:  {cases.length}</div>

        <div>
          <span>Get statistic by hours: </span>
          <Button clickAction={() => this.getTestCaseByTime(1)} title={'Last hour'} />
          <Button clickAction={() => this.getTestCaseByTime(2)} title={'Last 2 hours'} />
          <Button clickAction={() => this.getTestCaseByTime(3)} title={'Last 3 hours'} />
          <Button clickAction={() => this.getTestCaseByTime(4)} title={'Last 4 hours'} />
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
                      onChange={(dateObj) => this.filterTestCasesByDay('startDate', dateObj)}
                      title="Choose start date"
                    />
                  </div>
                }
                {
                  toDateOpen &&
                  <div className="calendar-wrapper end-date">
                    <ReporterCalendar
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
