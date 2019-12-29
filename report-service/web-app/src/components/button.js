import './styles/button.css'

import classnames from 'classnames'
import React, {Component} from 'react'

class Button extends Component {
  render() {
    const {title, onClick, className = ''} = this.props
    const classNames = classnames('btn', className)
    return (
      <button onClick={onClick} className={classNames}>
        {title}
      </button>
    )
  }
}

export {
  Button
}
