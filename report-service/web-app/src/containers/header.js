import './styles/header.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTestCases} from '../server-client/actions'
import {updateCasesList} from '../reducers/action.creators'
import {InformationMessage, Button} from '../components'
import {dataFormatter} from '../utils'
import {DropList} from '../components/drop.list'

class Header extends Component {

  state = {
    fromDateOpen: false,
    toDateOpen: false,
    autosync: false,
    messages: []
  }

  componentDidMount() {
    dataFormatter.pubSubSubscribe('buildInfo_warning', (ms, data) => {
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

      return (
        <InformationMessage
          {...messageInfo}
          key={index}
          onClick={removeMessage}
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
    const {autosync} = this.state

    if(cases.length) {
      startDate = startDate ? startDate : cases[0].date
      endDate = endDate ? endDate : cases[cases.length - 1].date
    }

    return (
      <nav className="header">
        {this.renderMessages()}

        <div className="header_information">
          <h4>Tests count is:  <span className="test_case_count">{cases.length}</span></h4>
        </div>

        <div className="header_actions">
          <Button title={"Resync cases"} onClick={this.resyncCases} />

          <Button
            title={!autosync ? 'Enable autosync' : 'Disable autosync'}
            className={autosync ? 'active' : ''}
            onClick={this.enableAutoSync}
          />

          <DropList
            className={'drop_range'}
            title={'Date range'}
            items={[
              {name: 'Half a hour', click: () => this.getTestCaseByTime(0.5)},
              {name: 'One hour', click: () => this.getTestCaseByTime(1)},
              {name: 'Two hours', click: () => this.getTestCaseByTime(2)},
              {name: 'Three hours', click: () => this.getTestCaseByTime(3)},
              {name: 'Four hours', click: () => this.getTestCaseByTime(4)},
              {name: 'One day', click: () => this.getTestCaseByTime(24)},
              {name: 'Two days', click: () => this.getTestCaseByTime(48)},
            ]}
          />
        </div>
        <div>
        </div>
      </nav>
    )
  }
}

export default connect(({cases: {cases, count, startDate, endDate}}) => ({cases, count, startDate, endDate}))(Header)
