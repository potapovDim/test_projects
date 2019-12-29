import './styles/navigation.menu.css'

import React, {Component} from 'react'
import {Button} from '../components/button'
import {localStorage, locationStorage} from '../utils'

class NavigationMenu extends Component {

  renderMenu = () => {

    const currentView = locationStorage.getLocationHash()
    const {toggleContent, navidationButtons} = this.props

    return navidationButtons.map((toggler, index) => {
      return (
        <div key={index}>
          <Button
            className={currentView === toggler ? 'active' : ''}
            onClick={() => toggleContent(toggler)}
            title={toggler.match(/[A-Z][a-z]+/g).join(' ')}
          />
        </div>
      )
    })

  }

  render() {
    return (
      <div className="navigation-menu-internal-content">
        {this.renderMenu()}
      </div>
    )
  }
}

export default NavigationMenu
