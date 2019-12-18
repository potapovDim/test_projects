import './styles/information.message.css'

import React, {Component} from 'react'
import classnames from 'classnames'

class InformationMessage extends Component {
  render() {
    const {
      message,
      className = '',
      // noop
      clickAction = () => {},
    } = this.props

    const classNames = classnames('message', className)

    return (
      <div className="alert information_message" onClick={clickAction}>
        <span className={classNames}>{message}</span>
      </div>
    )
  }
}

export {
  InformationMessage
}