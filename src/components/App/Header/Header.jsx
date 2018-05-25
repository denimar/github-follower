import React from 'react'
import './Header.scss'
import gitHubLogoPng from '../../../images/electrocat.png'
import GoThreeBars from 'react-icons/lib/go/three-bars'
import MainMenu from '../MainMenu'
import UserButton from './UserButton'
import { CredentialContext } from '../../../contexts/CredentialContext'

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      hamburgerMenu: null
    }
  }

  componentDidMount() {
    this.setState({
      hamburgerMenu: document.querySelector('.header-hamburger-menu')
    });
  }

  headerHamburgerMenuClick() {
    this.mainMenu.toggle();
  }

  render() {

    return (
      <CredentialContext.Consumer>
        {
          credentialContext => {
            return (
              <div className="main-header">
                <div className="main-header-content">
                  <GoThreeBars
                    className="header-hamburger-menu"
                    color='#006699'
                    size=" 22"
                    onClick={ this.headerHamburgerMenuClick.bind(this) }
                  />
                  <img className="github-follower-logo" src={ gitHubLogoPng } />
                  <div className="github-follower-title">GitHub Follower</div>
      
                  <UserButton credentialContext={ credentialContext } />
      
                  <MainMenu ref={ elem => this.mainMenu = elem } buttonCaller={ this.state.hamburgerMenu } />
                </div>
              </div>
            )  
          }
        }  
      </CredentialContext.Consumer>  
    )
  }
}

export default Header;
