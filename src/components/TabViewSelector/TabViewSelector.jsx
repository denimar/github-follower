import React from 'react'
import './TabViewSelector.scss'
import Clock from '../Clock'
import FaFilter from 'react-icons/lib/fa/filter'
import FaCog from 'react-icons/lib/fa/cog'
import MdViewColumn from 'react-icons/lib/md/view-column'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import ConfigModal from '../Config/ConfigModal'

class TabViewSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      tabIndex: 0
    }
  }

  componentDidMount() {
    this.filterButton = document.querySelector('.tab-view-selector-container .tab-view-selector-buttons-container .tab-view-selector-button');
  }

  filterButtonClick() {
    let filterSideNav = document.querySelector('.filter-side-nav-container');
    if (filterSideNav.classList.contains('opened')) {
      this.filterButton.classList.remove('pressed');
      filterSideNav.classList.add('closed');
      filterSideNav.classList.remove('opened');
    } else {
      this.filterButton.classList.add('pressed');
      filterSideNav.classList.add('opened');
      filterSideNav.classList.remove('closed');

      //setTimeout(() => {
        let filterSideNavInput = document.querySelector('.filter-side-nav-container .filter-side-nav-input');
        filterSideNavInput.focus();
      //}, 500);
    }
  }

  configButtonClick() {
    let configModal = new ConfigModal();
    configModal.show();
  }

  TabViewSelectorItemClick(tabIndex) {
    this.setState({
      tabIndex: tabIndex
    })
  }

  render() {
    return (
      <div className="tab-view-selector-container">
        <div className="tab-view-selector">
          <div className="tab-view-selector-label">vision :</div>

          <NavLink to={ '/repositories' } className="route-view" activeClassName="route-active">
            <div className="tab-view-selector-item">
              Repositories
            </div>
          </NavLink>
          <NavLink to={ '/users' } className="route-view" activeClassName="route-active">
            <div className="tab-view-selector-item">
              Users
            </div>
          </NavLink>
        </div>
        <Clock />
        <div className="tab-view-selector-buttons-container">
          <div className="tab-view-selector-buttons">
            <OverlayTrigger placement="left" overlay={ <Tooltip id="tooltip">Configurações do Git Follower</Tooltip> }>
              <FaCog
                className="tab-view-selector-button config"
                onClick={ this.configButtonClick.bind(this) }
              />
            </OverlayTrigger>
            <FaFilter
              className="tab-view-selector-button filter"
              onClick={ this.filterButtonClick.bind(this) }
            />
          </div>
        </div>
      </div>
    )

  }

}

export default TabViewSelector;
