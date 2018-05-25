import React from 'react'
import './PullRequestsViewer.scss'
import PullRequestTypeEnum from './PullRequestTypeEnum'
import GoGitPullRequest from 'react-icons/lib/go/git-pull-request'
import Moment from 'moment'

class PullRequestsViewer extends React.Component {

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
      let pullRequests
      if (props.type === PullRequestTypeEnum.OPEN) {
        pullRequests = repository.openPullRequests
      } else if (props.type === PullRequestTypeEnum.CLOSED) {
        pullRequests = repository.closedPullRequests
      } else {
        pullRequests = repository.mergedPullRequests
      }
      return pullRequests.edges
    }
    return []
  }  

  _openPushRequest(number) {
    https://github.com/facebook/react/pull/
    const url = `https://github.com/${this.props.repository.login}/${this.props.repository.name}/pull/${number}`
    window.open(url, '_blank');
  }

  render() {
    return (
      <div className="pull-requests-viewer-container">
        {      
          this.state.pullRequestsEdges.map(edge => {
            return (
              <div key={ edge.node.number } className="pull-requests-viewer-item">
                <GoGitPullRequest className="pull-requests-viewer-item-icon" />
                <span className="pull-requests-viewer-item-title" onClick={ this._openPushRequest.bind(this, edge.node.number) }>{ this._getFormattedPullRequestTitle(edge.node) }</span>                 
              </div>
            )
          })
        }  
      </div>
    )
  }

  _getFormattedPullRequestTitle(node) {
    let momentDate = Moment(node.createdAt)
    return `${node.title} (open: ${momentDate.format('MM/DD/YYYY HH:mm')})`
  }

}

export default PullRequestsViewer