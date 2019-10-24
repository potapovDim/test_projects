import React, {Component} from 'react'

class Header extends Component {
  render() {
    const {count = 0} = this.props
    return (
      <nav className="header">
        <h2>
          Header fragment
        </h2>
        <span>Tests count is:  {count}</span>
      </nav>
    )
  }
}

export {
  Header
}