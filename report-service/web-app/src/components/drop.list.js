import './styles/drop.list.css'

import React from 'react'
import classnames from 'classnames'

const DropList = ({title, items = [], className}) => {
  const classNames = classnames('dropdown', className)

  return (<div className={classNames}>
    <button className="btn dropbtn">{title}</button>
    <div className="dropdown-content">
      {items.map(({name, click}) => <a onClick={click}>{name}</a>)}
    </div>
  </div>)
}

export {
  DropList
}
