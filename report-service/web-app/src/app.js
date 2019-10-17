
import React, {Component} from "react";

import './styles/app.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      a: 1,
      b: 2
    }
  }

  render() {
    const {a, b} = this.state
    return (
      <div>
        <h1>Initial React App {a} {b}</h1>
      </div>
    );
  }
}

export default App;