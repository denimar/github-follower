import React from 'react'
import RepositoryPanel from './RepositoryPanel'
import GitHubService from '../../services/GitHubService'
// GraphQL
import gql from 'graphql-tag';

const getRepositoryInfoQuery = gql`
  query getRepositoryInfoQuery($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
      	defaultBranchRef {
          commits:target {
            ... on Commit {
              history(first:1) {
								totalCount
              }
            }
          }
        }
        currentVersionRef:refs(refPrefix: "refs/tags/", last: 1, orderBy: {field: TAG_COMMIT_DATE, direction: ASC}) {
          edges {
            node {
              name
            }
          }
        }        
        openPullRequests:pullRequests(states:OPEN) {
          totalCount
        }
        mergedPullRequests:pullRequests(states:MERGED) {
          totalCount
        }         
        openIssues:issues(states:OPEN) {
          totalCount
        }
        closedIssues:issues(states:CLOSED) {
          totalCount
        }        
      }
    }
  }
`

class RepositoryPanelContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: {}}
    const variables = { login: props.repository.login, name: props.repository.name }
    this.RepositoryPanelWithInfo = GitHubService.withInfo(getRepositoryInfoQuery, variables)(RepositoryPanel)
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
    return ( <this.RepositoryPanelWithInfo { ...newProps } /> )
  }

}

export default RepositoryPanelContainer