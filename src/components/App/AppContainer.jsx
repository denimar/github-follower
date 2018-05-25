import React from 'react'
import App from './App'
import { CredentialContext } from '../../contexts/CredentialContext'
import Login from './Login'
import GitHubService from '../../services/GitHubService'

class AppContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      authorizationHeader: null,
      userProfile: {},
      setCredential: (authorizationHeader, userProfile) => {
        localStorage.setItem('Authentication', authorizationHeader)
        localStorage.setItem('userProfile', JSON.stringify(userProfile, null, 4))
        this.setState({ authorizationHeader, userProfile })
      },
      logOut: () => {
        localStorage.removeItem('Authentication')
        localStorage.removeItem('userProfile')
        this.setState({ authorizationHeader: null, userProfile: null })
      }      
    }
  }

  async componentDidMount() {
    await this._checkCredential()
  }

  render() {
    return (
      <CredentialContext.Provider value={ this.state }> 
        {
          this.state.authorizationHeader ? (
            <App />
          ) : (
            <Login />
          )  
        }
      </CredentialContext.Provider>      
    )
  }

  async _checkCredential() {
    let authorizationHeader = localStorage.getItem('Authentication')
    if (authorizationHeader) {
      let userProfile = JSON.parse(localStorage.getItem('userProfile'))
      this.state.setCredential(authorizationHeader, userProfile)
    }  
  }

}

export default AppContainer 