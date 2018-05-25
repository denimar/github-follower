import React from 'react'
import DeniDlg from 'deni-react-dialog'
import DeniReactGrid from 'deni-react-grid'
import RepositoryService from '../../../services/RepositoryService'
import RepositoryUpsertModal from '../RepositoryUpsertModal'

class RepositoryModalGrid extends React.Component {

    async _removeItem(record) {
        let removed = await RepositoryService.removeItem(record.id)
        if (removed) {
            this.grid.api.removeSelectedRows()
            this.props.repositoryContext.setRepositories(this.grid.props.options.data)
        }
    }

    async _editItem(record) {
        let repositoryUpsertModal = new RepositoryUpsertModal(record, this.grid, this.props.repositoryContext)
        repositoryUpsertModal.show()
    }

   _getOptions(data) {
      return {
        data: data,
        columns: [
            {
            header: 'Login',
            name: 'fullName',
            width: '50%',
            renderer: (value) => {
                return value.split('/')[0]
            }
            },
            {
            header: 'name',
            name: 'fullName',
            width: '50%',
            renderer: (value) => {
                return value.split('/')[1]
            }
            },
            {
            width: '5%',
            action: {
                self: this,
                icon: 'https://denimar.github.io/ui-deni-grid/examples/images/edit.png',
                tooltip: 'Edit that employee...',
                fn: function(record) {
                    this.self._editItem(record)
                }
            }
            }, {
            width: '5%',
            action: {
                self: this,
                icon: 'https://denimar.github.io/ui-deni-grid/examples/images/delete.png',
                tooltip: 'Delete that employee...',
                fn: function(record) {
                    DeniDlg.confirm('Confirm exclusion?').then(dlgAnswerData => {
                        if (dlgAnswerData.button === 'yes') {
                            this.self._removeItem(record)
                        }
                    })
                }
            }
            }
        ]
      }
   } 

   render() {
      return (
        <DeniReactGrid 
            ref={
                (elem) => {
                    this.grid = elem
                }
            }
            options={ this._getOptions(this.props.data) } 
        />       
      ) 
   } 
}

export default RepositoryModalGrid