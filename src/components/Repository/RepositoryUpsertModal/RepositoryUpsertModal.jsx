import { DeniReactModal, Button, Position } from 'deni-react-modal'
import DeniDlg from 'deni-react-dialog'
import React from 'react'
import './RepositoryUpsertModal.scss'
import RepositoryService from '../../../services/RepositoryService'

class RepositoryUpsertModal extends DeniReactModal {

  constructor(currentRecord, parentGrid, repositoryContext) {
    super()
    this.currentRecord = currentRecord || {}
    this.parentGrid = parentGrid
    this.repositoryContext = repositoryContext
    this.editing = this.currentRecord.id !== undefined
  }

  async modalConfirm(modalContainer, buttonObj) {
    if (buttonObj.value === 'ok') {
      let body = modalContainer.querySelector('.repository-upsert-modal-container')
      let loginInput = body.querySelector('fieldset > input[name=login]')
      let login = loginInput.value
      let nameInput = body.querySelector('fieldset > input[name=name]')
      let name = nameInput.value
      let fullName = login + '/' + name            
      let record = { fullName, login, name }
      let fn
      if (this.editing) {
        record.id = this.currentRecord.id
        await RepositoryService.updateItem(record)
        DeniDlg.ghost('Record updated successfully!', DeniDlg.Constant.MESSAGE_TYPE.SUCCESS, 3000, 'Repositories')
        this.parentGrid.api.updateSelectedRow(record)
        this.repositoryContext.setRepositories(this.parentGrid.props.options.data)                
      } else {
        let newRecord = await RepositoryService.addItem(record)
        newRecord.login = login
        newRecord.name = name
        DeniDlg.ghost('Record inserted successfully!', DeniDlg.Constant.MESSAGE_TYPE.SUCCESS, 3000, 'Repositories')
        let newData = [...this.parentGrid.props.options.data, newRecord]
        this.parentGrid.api.loadData(newData)
        this.repositoryContext.setRepositories(newData)        
      }
    }
    return true
  }

  getConfig() {
    const labelAux = this.editing ? 'editing' : 'inserting'
    return {
      title: `Repository - ${labelAux}...`,
      width: '450px',
      buttons: [
        Button.CANCEL,
        Button.OK
      ]
    }
  }

  render() {
    return (
      <div className="repository-upsert-modal-container">
        <fieldset>
          <legend>Repository data</legend>
          <label htmlFor="login">Login:</label>
          <input type="text" name="login" autoFocus defaultValue={ this.currentRecord.login } />
          <br />
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" defaultValue={ this.currentRecord.name } />
        </fieldset>
      </div>
    )
  }
  
}

export default RepositoryUpsertModal;