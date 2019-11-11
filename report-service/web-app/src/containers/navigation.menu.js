import React, {Component} from 'react'
import lStorage from '../utils/local.storage'
import {Button} from '../components/button'

class NavigationMenu extends Component {

  renderMenu = () => {

    const currentView = lStorage.lsGet('view')
    const {toggleContent, navidationButtons} = this.props

    return navidationButtons.map((toggler, index) => {
      return (
        <div key={index}>
          <Button
            className={currentView === toggler ? 'active' : ''}
            clickAction={() => toggleContent(toggler)}
            title={toggler.match(/[A-Z][a-z]+/g).join(' ')}
          />
        </div>
      )
    })

  }

  render() {
    return (
      <div className="navigation_menu">
        {this.renderMenu()}
      </div>
    )
  }
}

export default NavigationMenu
