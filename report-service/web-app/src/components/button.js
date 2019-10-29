import React, {Component} from 'react';

class Button extends Component {
  render() {
    const {title, clickAction, className = 'btn btn-primary'} = this.props
    return (
      <button onClick={clickAction} className={className}>
        {title}
      </button>
    )
  }
}

export {
  Button
}
