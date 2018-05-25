import React from 'react'
import PullRequestsViewer from './PullRequestsViewer'
import GitHubService from '../../services/GitHubService'
import gql from 'graphql-tag';

const getPushRequetsQuery = gql`
  query getPushRequetsQuery($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        openPullRequests:pullRequests(states:OPEN, first:3, orderBy:{ field:CREATED_AT, direction:DESC }) {
          edges {
            node {
              number
              createdAt
              title
            }
          }
        }      
        mergedPullRequests:pullRequests(states:MERGED, first:3, orderBy:{ field:CREATED_AT, direction:DESC }) {
          edges {
            node {
              number
              createdAt
              title
            }
          }
        }      
      }
    }
  }
`

class PullRequestsViewerContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: {}}

    const variables = { login: props.repository.login, name: props.repository.name }
    this.PullRequestsViewerWithInfo = GitHubService.withInfo(getPushRequetsQuery, variables)(PullRequestsViewer)
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
    return ( <this.PullRequestsViewerWithInfo { ...newProps } /> )
  }

}

export default PullRequestsViewerContainer