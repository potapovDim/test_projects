import './styles/drop.list.css'

import React from 'react'
import classnames from 'classnames'
import {Button} from './button'

const DropList = ({title, items = [], className}) => {
  const classNames = classnames('dropdown', className)

  return (<div className={classNames}>
    <button className="btn dropbtn">{title}</button>
    <div className="dropdown-content">
      {items.map(({name, click}, index) => <Button key={index} onClick={click} title={name} />)}
    </div>
  </div>)
}

export {
  DropList
}
