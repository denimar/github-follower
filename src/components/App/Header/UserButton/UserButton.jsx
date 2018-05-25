import React from 'react'
import './UserButton.scss'
import FaUser from 'react-icons/lib/fa/user'
import GoSignOut from 'react-icons/lib/go/sign-out'
import ReactPopover from 'deni-react-popover'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

class UserButton extends React.Component {

  _userButtonClick() {
    this.popoverUserButton.toggle();
  }

  _logoutButtonClick() {
    this.props.credentialContext.logOut()
  }

  render() {
    const credentialContext = this.props.credentialContext
    const userProfile = credentialContext.userProfile

    return (
      <div className="user-button-container" onClick={ this._userButtonClick.bind(this) }>
        <div className="user-button-icon" id="mainUserButton">
          <FaUser className="user-button-icon" size="32" />
          <span className="user-button-nickname">{ userProfile.login }</span>
        </div>
        <ReactPopover ref={ elem => this.popoverUserButton = elem } target="mainUserButton" horizontalPosition="right">
          <div className="user-data-container">
            <div className="user-data-body">
              <div className="user-data-photo">
                <img src={ userProfile.avatar_url } />
              </div>
              <div className="user-data-content">
                <div>{ userProfile.name }</div>
                <div>{ userProfile.location || userProfile.bio || userProfile.company }</div>
              </div>                  
            </div>
            <div className="user-data-toolbar">
              <OverlayTrigger placement="left" overlay={ <Tooltip>Logout</Tooltip> }>
                <GoSignOut size="24" className="signout-button" onClick={ this._logoutButtonClick.bind(this) }  />
              </OverlayTrigger>
            </div>
          </div>
        </ReactPopover>
      </div>
    )
  }

}

export default UserButton;
