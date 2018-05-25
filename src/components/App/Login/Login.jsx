import React from 'react'
import './Login.scss'
import Constant from '../../../util/Constant'
import GitHubService from '../../../services/GitHubService'
import gitHubLogoPng from '../../../images/electrocat.png'
import FaUser from 'react-icons/lib/fa/user'
import MdLock from 'react-icons/lib/md/lock'
import { CredentialContext } from '../../../contexts/CredentialContext'

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      errorMessage: null
    }
    this.keydownFn = () => {
      if (event.keyCode === 13) {
        this.loginButtonClick()
      }
    }
    document.addEventListener('keydown', this.keydownFn)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownFn)
  }

  // componentDidMount() {
  //   alert('did Mout')
  // }

  async loginButtonClick() {
    let userName = this.usernameInput.value
    let password = this.passwordInput.value

    let credentialData = await GitHubService.gitHubAuthenticate(userName, password)

    if (credentialData.errorMessage) {
      this.setState({
        errorMessage: credentialData.errorMessage
      })
    } else {
      this.credentialContext.setCredential(credentialData.authorizationHeader, credentialData.userProfile)
    }  
  }

  render() {
    return (
      <CredentialContext.Consumer>
        {
          credentialContext => {
            this.credentialContext = credentialContext
            return (
              <div className="login-container">
                <div className="login-vertical-align-div">
                  <div className="login-box">
                    <div className="github-follower-logo-and-title">
                      {
                        <img className="github-follower-logo" src={ gitHubLogoPng } />
                      }
                      <div className="github-follower-title">GitHub Follower</div>
                    </div>
                    <form method="post">
                      <div className="input-container">
                        <FaUser className="field-input-icon" />
                        <input className="field-input" type="text" placeholder="username" autoFocus={ true } ref={ (elem) => this.usernameInput = elem } />
                      </div>
                      <div className="input-container">
                        <MdLock className="field-input-icon" />
                        <input className="field-input" type="password" placeholder="password" ref={ (elem) => this.passwordInput = elem } />
                      </div>
                    </form>
                    <div className="login-button-container">
                      <div className="login-submit-button" onClick={ this.loginButtonClick.bind(this) }>Login</div>
                    </div>
                    <div className="login-error-message">
                      { this.state.errorMessage }
                    </div>
                  </div>
                </div>
              </div>
            )  
          }  
        }  
      </CredentialContext.Consumer>  
    )
  }

}

export default Login;
