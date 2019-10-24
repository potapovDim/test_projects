import React, {Component} from 'react'
import {connect} from 'react-redux'

class Header extends Component {
  render() {
    const {count = 0, startDate, endDate} = this.props

    return (
      <nav className="header">
        <h2>
          Header fragment
        </h2>
        <span>Tests count is:  {count}</span>
        {startDate && <div>{startDate}</div>}
        {endDate && <div>{startDate}</div>}
      </nav>
    )
  }
}

export default connect(({cases: {count, startDate, endDate}}) => ({count, startDate, endDate}))(Header)
