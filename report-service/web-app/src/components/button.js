import './styles/button.css'

import classnames from 'classnames'
import React, {Component} from 'react'

class Button extends Component {
  render() {
    const {title, clickAction, className = ''} = this.props
    const classNames = classnames('btn', className)
    console.log(classNames)
    return (
      <button onClick={clickAction} className={classNames}>
        {title}
      </button>
    )
  }
}

export {
  Button
}
