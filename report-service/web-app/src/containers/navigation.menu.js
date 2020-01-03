import './styles/navigation.menu.css'

import React, {Component} from 'react'
import {Button} from '../components/button'
import {locationStorage} from '../utils'

class NavigationMenu extends Component {

  renderMenu = () => {
    const currentView = locationStorage.getLocationHash()
    const {toggleContent, navidationButtons} = this.props
    return navidationButtons.map((toggler, index) =>
      <Button
        key={index}
        className={currentView === toggler ? 'active' : ''}
        onClick={() => toggleContent(toggler)}
        title={toggler.match(/[A-Z][a-z]+/g).join(' ')}
      />
    )
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
