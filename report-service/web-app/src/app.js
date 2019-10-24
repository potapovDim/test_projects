import React, {Component} from "react";
import {ReporterCalendar} from './components/calendar'
import {FailedCasesList} from './containers/test.cases.list'
import {Button} from './components/button'
import moment from 'moment'

import './styles/app.css'

class App extends Component {

  state = {
    fromDate: {isOpen: false, title: 'From Date', date: null},
    toDate: {isOpen: false, title: 'To Date', date: null}
  }

  toggleCalendar = (name) => {
    const currentStateItem = this.state[name]
    this.setState({
      [name]: {
        ...currentStateItem,
        isOpen: !currentStateItem.isOpen
      }
    })
  }

  selectDate = (name, date) => {
    const currentStateItem = this.state[name]
    this.setState({
      [name]: {
        ...currentStateItem,
        date,
        title: date.toString()
      }
    })
  }

  render() {

    const {fromDate: {isOpen: isOpenFrom, title: titleFrom}} = this.state
    const {toDate: {isOpen: isOpenTo, title: titleTo}} = this.state
    console.log(this.state)
    return (
      <div>
        <nav>
          this is Header
        </nav>
        <h1>Initial React App</h1>
        <Button name={titleFrom} clickAction={() => this.toggleCalendar('fromDate')} />
        <Button name={titleTo} clickAction={() => this.toggleCalendar('toDate')} />

        {isOpenFrom && <ReporterCalendar onChange={(date) => this.selectDate('fromDate', date)} />}
        {isOpenTo && <ReporterCalendar onChange={(date) => this.selectDate('toDate', date)} />}

        <FailedCasesList />
      </div>
    );
  }
}

export default App
