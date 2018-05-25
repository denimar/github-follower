import React from 'react'
import CommitsViewer from './CommitsViewer'
import GitHubService from '../../services/GitHubService'
import gql from 'graphql-tag';

const getCommitsQuery = gql`
  query getCommitsQuery($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        defaultBranchRef {
          commits:target {
            ... on Commit {
              history(first: 3) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    oid
                    committedDate
                    author {
                      avatarUrl
                      name
                      user {
                        login
                      }                      
                    }
                    commitUrl
                    messageHeadlineHTML                      
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

class CommitsViewerContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: {}}

    const variables = { login: props.repository.login, name: props.repository.name }
    this.CommitsViewerWithInfo = GitHubService.withInfo(getCommitsQuery, variables)(CommitsViewer)
  }

  componentWillReceiveProps(newProps) {
    const data = newProps.data
    this.setState({ data })
  }    

  render() {
    const newProps = {
      ...this.props,
      data: this.state.data
    }   
    return ( <this.CommitsViewerWithInfo { ...newProps } /> )
  }

}

export default CommitsViewerContainer