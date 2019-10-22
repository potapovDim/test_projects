
import React, {Component} from "react";
import {ReporterCalendar} from './components/calendar'
import './styles/app.css';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Initial React App</h1>
        <ReporterCalendar />
        <ReporterCalendar />
      </div>
    );
  }
}

export default App;