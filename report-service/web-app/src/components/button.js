import React, {Component} from 'react';

class Button extends Component {
  render() {
    const {name, clickAction} = this.props
    return (
      <button onClick={clickAction}>
        {name}
      </button>
    )
  }
}

export {
  Button
}
