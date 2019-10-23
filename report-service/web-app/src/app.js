
import React, {Component} from "react";
import {ReporterCalendar} from './components/calendar'
import {FailedCasesList} from './containers/test.cases.list'
import './styles/app.css';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Initial React App</h1>
        <ReporterCalendar />
        <ReporterCalendar />
        < FailedCasesList />
      </div>
    );
  }
}

export default App;