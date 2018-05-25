import React from 'react';
import './RepositoryView.scss'
import RepositoryPanelContainer from '../../components/RepositoryPanel/RepositoryPanelContainer'
import RepositoryService from '../../services/RepositoryService'
import GitHubService from '../../services/GitHubService'
import { ApolloProvider } from 'react-apollo'
import { CredentialContext } from '../../contexts/CredentialContext'

class RepositoryView extends React.Component {

  render() {
    return (
      <CredentialContext.Consumer>
        {
          credentialContext => {
            return (
              <div className="repository-view-viewport">
                <div className="repository-view-container">
                  {
                    this.props.repositories.map(repository => {
                      return (
                        <ApolloProvider key={ repository.id } client={ GitHubService.getAppoloClient() }>
                          <RepositoryPanelContainer repository={ repository } credentialContext={ credentialContext } />
                        </ApolloProvider>  
                      )
                    })
                  }
                </div>
              </div>              
            )
          }
        }
      </CredentialContext.Consumer>
    )
  }

}

export default RepositoryView
