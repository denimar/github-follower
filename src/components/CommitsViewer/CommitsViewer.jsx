import React from 'react'
import './CommitsViewer.scss'

class CommitsViewer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      historyEdges: this._getHistoryEdgesByProps(props)
    }
  }

  componentWillReceiveProps(newProps) {
    const historyEdges = this._getHistoryEdgesByProps(newProps)
    this.setState({ historyEdges })
  }

  _getHistoryEdgesByProps(props) {
    if (props.data && props.data.repositoryOwner) {
      this.history = props.data.repositoryOwner.repository.defaultBranchRef.commits.history
      return this.history.edges;
    }  
    return []
  }

  _openAuthorGitHub(authorLogin) {
    const url = `https://github.com/${authorLogin}`
    window.open(url, '_blank');
  }

  _openAuthorCommits(authorLogin) {
    const url = `https://github.com/${this.props.repository.login}/${this.props.repository.name}/commits?author=${authorLogin}`
    window.open(url, '_blank');
  }

  _openAuthorCommit(oid) {
    const url = `https://github.com/${this.props.repository.login}/${this.props.repository.name}/commit/${oid}`
    window.open(url, '_blank');
  }

  render() {
    return (
      <div className="commits-viewer-container">
        {
          this.state.historyEdges.map(edge => {
            return (
              <div key={ edge.node.oid } className="commits-viewer-item">
                <img className="commits-viewer-item-avatar" src={ edge.node.author.avatarUrl } onClick={ this._openAuthorGitHub.bind(this, edge.node.author.user.login) } />
                <span className="commits-viewer-item-userlogin" onClick={ this._openAuthorCommits.bind(this, edge.node.author.user.login) }>{ edge.node.author.user.login }</span>
                <span className="commits-viewer-item-messageHeadLine" onClick={ this._openAuthorCommit.bind(this, edge.node.oid) }>{ this._formatMessageHeadlineHTML(edge.node.messageHeadlineHTML) }</span>
              </div>
            )
          })
        }
      </div>
    )
  }

  _formatMessageHeadlineHTML(messageHeadlineHTML) {
    return (
      <span dangerouslySetInnerHTML={ {__html: messageHeadlineHTML} }></span>
    )
  }

}

export default CommitsViewer