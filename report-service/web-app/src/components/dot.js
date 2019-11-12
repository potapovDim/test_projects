import './styles/dot.css'

import React from 'react'
import classnames from 'classnames'

const Dot = ({className = ''}) => {
  const classNames = classnames('dot', className)
  return (<span className={classNames}></span>)
}

export {
  Dot
}
