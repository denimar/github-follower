import React from 'react'
import IssuesViewer from './IssuesViewer'
import GitHubService from '../../services/GitHubService'
import gql from 'graphql-tag';

const getPushRequetsQuery = gql`
  query getPushRequetsQuery($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        openIssues:issues(states:OPEN, first:3, orderBy:{ field:CREATED_AT, direction:DESC }) {
          edges {
            node {
              number
              title
            }
          }
        }      
        closedIssues:issues(states:CLOSED, first:3, orderBy:{ field:CREATED_AT, direction:DESC }) {
          edges {
            node {
              number
              title
            }
          }
        }      
      }
    }
  }
`

class IssuesViewerContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: {}}

    const variables = { login: props.repository.login, name: props.repository.name }
    this.IssuesViewerWithInfo = GitHubService.withInfo(getPushRequetsQuery, variables)(IssuesViewer)
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
    return ( <this.IssuesViewerWithInfo { ...newProps } /> )
  }

}

export default IssuesViewerContainer