import React from 'react'
import './IssuesViewer.scss'
import IssuesTypeEnum from './IssuesTypeEnum'
import GoIssueOpened from 'react-icons/lib/go/issue-opened'
import GoIssueClosed from 'react-icons/lib/go/issue-closed'

class IssuesViewer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pullRequestsEdges: this._getPullRequestsEdgesByProps(props)
    }
  }

  componentWillReceiveProps(newProps) {
    const pullRequestsEdges = this._getPullRequestsEdgesByProps(newProps)
    this.setState({ pullRequestsEdges })
  }

  _getPullRequestsEdgesByProps(props) {
    if (props.data && props.data.repositoryOwner) {
      let repository = props.data.repositoryOwner.repository
      let issues
      if (props.type === IssuesTypeEnum.OPEN) {
        issues = repository.openIssues
      } else {
        issues = repository.closedIssues
      }
      return issues.edges
    }
    return []
  }  

  _openIssue(number) {
    const url = `https://github.com/${this.props.repository.login}/${this.props.repository.name}/issues/${number}`
    window.open(url, '_blank');
  }

  render() {
    let IssueIcon = this.props.type === IssuesTypeEnum.OPEN ? GoIssueOpened : GoIssueClosed
    return (
      <div className="issues-viewer-container">
        {      
          this.state.pullRequestsEdges.map(edge => {
            return (
              <div key={ edge.node.number } className="issues-viewer-item">
                <IssueIcon className="issues-viewer-item-icon" />
                <span className="issues-viewer-item-title" onClick={ this._openIssue.bind(this, edge.node.number) }>{ edge.node.title }</span>                 
              </div>
            )
          })
        }  
      </div>
    )
  }

}

export default IssuesViewer