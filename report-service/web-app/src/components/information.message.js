import './styles/information.message.css'

import React, {Component} from 'react'
import classnames from 'classnames'

const InformationMessage = ({message, className = '', onClick}) => {
  const classNames = classnames('message', className)
  return (
    <div className="alert">
      <span className="closebtn" onClick={onClick}>&times;</span>
      {message}
    </div>
  )
}

export {
  InformationMessage
}