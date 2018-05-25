import { DeniReactModal, Button, Position } from 'deni-react-modal'
import React from 'react'
import './RepositoryModal.scss'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import RepositoryModalGrid from './RepositoryModalGrid'
import RepositoryUpsertModal from '../RepositoryUpsertModal'

class RepositoryModal extends DeniReactModal {

  constructor(repositoryContext) {
    super()
    this.repositoryContext = repositoryContext
    this.repositories = repositoryContext.repositories
  }

  getConfig() {
    return {
      title: 'Repositories',
      width: '650px'
    }
  }

  _newRepositoryClick() {
    let repositoryUpsertModal = new RepositoryUpsertModal(undefined, this.repositoryModalGrid.grid, this.repositoryContext)
    repositoryUpsertModal.show()    
  }

  render() {
    return (
      <div className="repository-modal-container">
        <div className="repository-modal-toolbar">
          <div className="repository-new-item">
            <FaPlusCircle />
            <span onClick={ this._newRepositoryClick.bind(this) }>New Repository</span>
          </div>  
        </div>
        <RepositoryModalGrid 
          ref={ (elem) => this.repositoryModalGrid = elem }
          repositoryContext={ this.repositoryContext }
          data={ this.repositories } 
        />        
      </div>
    )
  }

}

export default RepositoryModal;