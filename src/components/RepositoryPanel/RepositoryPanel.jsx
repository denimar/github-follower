import React from 'react'
import './RepositoryPanel.scss'
import RepositoryService from '../../services/RepositoryService'
import CommitsViewerContainer from '../CommitsViewer'
import PullRequestsViewerContainer from '../PullRequestsViewer'
import IssuesViewerContainer from '../IssuesViewer'
import DashboardTypeEnum from './DashboardTypeEnum'
import PullRequestTypeEnum from '../PullRequestsViewer/PullRequestTypeEnum'
import IssuesTypeEnum from '../IssuesViewer/IssuesTypeEnum'

class RepositoryPanel extends React.Component {

  constructor() {
    super()
    this.state = {
      dashboardIndex: 1,
      repositoryInfo: {},
    }
  }

  async componentDidMount() {
    let gitHubToken = this.props.credentialContext.authorizationHeader
    let repositoryInfo = await RepositoryService.fetchRepositoryInfo(this.props.repository.fullName, gitHubToken)
    this.setState({ repositoryInfo })
  }

  render() {
    const repositoryOwner = this.props.data.repositoryOwner || {
      repository: {
        repositoryVersion: '',
        commitsTotalCount: 0,
        openPullRequestsTotalCount: 0,
        openIssuesTotalCount: 0,
        closedIssuesTotalCount: 0,
        currentVersionRef: {
          edges: []
        },
        defaultBranchRef: {
          commits: {
            history: {
              totalCount: 0
            }
          }    
        },
        openPullRequests: {
          totalCount: 0
        },
        mergedPullRequests: {
          totalCount: 0
        },
        openIssues: {
          totalCount: 0
        },
        closedIssues: {
          totalCount: 0
        }
      }
    }
    const repo = repositoryOwner.repository;
    const repositoryVersion = repo.currentVersionRef.edges.length > 0 ? repo.currentVersionRef.edges[0].node.name : '?'
    const commitsTotalCount = repo.defaultBranchRef.commits.history.totalCount
    const openPullRequestsTotalCount = repo.openPullRequests.totalCount
    const mergedPullRequestsTotalCount = repo.mergedPullRequests.totalCount
    const openIssuesTotalCount = repo.openIssues.totalCount
    const closedIssuesTotalCount = repo.closedIssues.totalCount

    let owner = this.state.repositoryInfo.owner || {}
    return (
      <div className="repository-panel-container">
        <div className="repository-panel-owner-img">
          <img src={owner.avatar_url} onClick={ this._openLink.bind(this, `https://github.com/${this.props.repository.login}`) } />
        </div>
        <div className="repository-panel-body">
          <div className="repository-panel-body-top">
            <div className="repository-panel-title">
              <span className="repository-panel-fullname" onClick={ this._openLink.bind(this, `https://github.com/${this.props.repository.fullName}`) } >
                { this.props.repository.fullName }
              </span>
              <span className="repository-panel-version" onClick={ this._openLink.bind(this, `https://github.com/${this.props.repository.fullName}/releases`) } >
                { repositoryVersion }
              </span>
            </div>

            <div className="repository-panel-dashboard-items">
              <div className={'repository-panel-dashboard-item commits' + (this.state.dashboardIndex === DashboardTypeEnum.COMMITS ? ' pressed' : '')} onClick={this._dashboardItemClick.bind(this, DashboardTypeEnum.COMMITS)} >
                <span className="repository-panel-dashboard-item-number">{ commitsTotalCount }</span>
                <span className="repository-panel-dashboard-item-desc">Commits</span>
              </div>
            </div>

            <div className="repository-panel-dashboard-items">
              <div className={'repository-panel-dashboard-item pull-requests' + (this.state.dashboardIndex === DashboardTypeEnum.OPEN_PULL_REQUESTS ? ' pressed' : '')} onClick={this._setDashboardIndex.bind(this, DashboardTypeEnum.OPEN_PULL_REQUESTS)} >
                <span className="repository-panel-dashboard-item-number">{ openPullRequestsTotalCount }</span>
                <span className="repository-panel-dashboard-item-desc">Open Pull Requests</span>
              </div>
            </div>

            <div className="repository-panel-dashboard-items">
              <div className={'repository-panel-dashboard-item pull-requests' + (this.state.dashboardIndex === DashboardTypeEnum.MERGED_PULL_REQUESTS ? ' pressed' : '')} onClick={this._dashboardItemClick.bind(this, DashboardTypeEnum.MERGED_PULL_REQUESTS)} >
                <span className="repository-panel-dashboard-item-number">{ mergedPullRequestsTotalCount }</span>
                <span className="repository-panel-dashboard-item-desc">Merged Pull Requests</span>
              </div>
            </div>

            <div className="repository-panel-dashboard-items">
              <div className={'repository-panel-dashboard-item issues' + (this.state.dashboardIndex === DashboardTypeEnum.OPEN_ISSUES ? ' pressed' : '')} onClick={this._dashboardItemClick.bind(this, DashboardTypeEnum.OPEN_ISSUES)} >
                <span className="repository-panel-dashboard-item-number">{ openIssuesTotalCount }</span>
                <span className="repository-panel-dashboard-item-desc">Open Issues</span>
              </div>
            </div>

            <div className="repository-panel-dashboard-items">
              <div className={'repository-panel-dashboard-item issues' + (this.state.dashboardIndex === DashboardTypeEnum.CLOSED_ISSUES ? ' pressed' : '')} onClick={this._dashboardItemClick.bind(this, DashboardTypeEnum.CLOSED_ISSUES)} >
                <span className="repository-panel-dashboard-item-number">{ closedIssuesTotalCount }</span>
                <span className="repository-panel-dashboard-item-desc">Closed Issues</span>
              </div>
            </div>

          </div>
          <div className="repository-panel-body-bottom">
            { this._getDashboardView(this.state.dashboardIndex) }
          </div>
        </div>
      </div>
    )
  }

  _openLink(url) {
    window.open(url, '_blank');
  }

  _getDashboardView(dashboardIndex) {
    switch (dashboardIndex) {
      case DashboardTypeEnum.COMMITS:
        return this._getDashboardCommitsView()
      case DashboardTypeEnum.OPEN_PULL_REQUESTS:
        return this._getDashboardOpenPushRequestsView()
      case DashboardTypeEnum.MERGED_PULL_REQUESTS:
        return this._getDashboardMergeddPushRequestsView()
      case DashboardTypeEnum.OPEN_ISSUES:
        return this._getDashboardOpenIssuesView()
      case DashboardTypeEnum.CLOSED_ISSUES:
        return this._getDashboardClosedIssuesView()
      default:
        return null
    }
  }

  _getDashboardCommitsView() {
    if (this.dashboardCommitsView === undefined) {
      this.dashboardCommitsView = <CommitsViewerContainer repository={this.props.repository} />
    }
    return this.dashboardCommitsView
  }

  _getDashboardOpenPushRequestsView() {
    if (this.dashboardOpenPushRequetsView === undefined) {
      this.dashboardOpenPushRequetsView = <PullRequestsViewerContainer repository={this.props.repository} type={PullRequestTypeEnum.OPEN} />
    }
    return this.dashboardOpenPushRequetsView
  }

  _getDashboardMergeddPushRequestsView() {
    if (this.dashboardMergedPushRequetsView === undefined) {
      this.dashboardMergedPushRequetsView = <PullRequestsViewerContainer repository={this.props.repository} type={PullRequestTypeEnum.MERGED} />
    }
    return this.dashboardMergedPushRequetsView
  }

  _getDashboardOpenIssuesView() {
    if (this.dashboardOpenIssuesView === undefined) {
      this.dashboardOpenIssuesView = <IssuesViewerContainer repository={this.props.repository} type={IssuesTypeEnum.OPEN} />
    }
    return this.dashboardOpenIssuesView
  }

  _getDashboardClosedIssuesView() {
    if (this.dashboardClosedIssuesView === undefined) {
      this.dashboardClosedIssuesView = <IssuesViewerContainer repository={this.props.repository} type={IssuesTypeEnum.CLOSED} />
    }
    return this.dashboardClosedIssuesView
  }

  _dashboardItemClick(dashboardIndex) {
    this._setDashboardIndex(dashboardIndex)
  }

  _setDashboardIndex(dashboardIndex) {
    this.setState({ dashboardIndex })
  }

}

export default RepositoryPanel