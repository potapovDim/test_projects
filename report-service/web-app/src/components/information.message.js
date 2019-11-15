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

    const classNames = classnames('information_message', className)

    return (
      <div className={classNames} onClick={clickAction}>
        <span className="message">{message}</span>
      </div>
    )
  }
}

export {
  InformationMessage
}