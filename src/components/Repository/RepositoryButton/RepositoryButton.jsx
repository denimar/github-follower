import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import GoRepo from 'react-icons/lib/go/repo'
import './RepositoryButton.scss'
import RepositoryModal from '../RepositoryModal'

class RepositoryButton extends React.Component {

  panelManagerClick() {
    let repositoryModal = new RepositoryModal(this.props.repositoryContext)
    repositoryModal.show()
  }

  render() {
    return (
      <div className="panels-manager-menu-button-container">

        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-panels">Repositories Registration</Tooltip>}>

          <div className="panels-manager-menu-button-dropdown" onClick={ this.panelManagerClick.bind(this) }>
            <GoRepo
              id="panelManagerMenuButton"
              className="panels-manager-menu-button-icon button"
            />
          </div>

        </OverlayTrigger>
      </div>
    )
  }

}

export default RepositoryButton;
