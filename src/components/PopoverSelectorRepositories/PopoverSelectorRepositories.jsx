import React from 'react'
import './PopoverSelectorRepositories.scss'
import ReactPopoverSelector from 'deni-react-popover-selector'
import RepositoryService from '../../services/RepositoryService'
import RepositoryButton from '../Repository/RepositoryButton'
import { RepositoryContext } from '../../contexts/RepositoryContext'

class PopoverSelectorRepositories extends React.Component {

  _onGetTextItem(itemToRender) {
    return itemToRender.name
  }

  _onGetTooltipText(itemToRender) {
    return itemToRender.fullName
  }

  async _onItemAdded(addedItem) {
    if (await this._persistAddedItem(addedItem)) {
      let selectedRepositories = this.props.selectedRepositories    
      selectedRepositories.push(addedItem)    
      this._handleOnChangeEvent(selectedRepositories)
    }
  }

  async _onItemRemoved(removedItem) {
    if (await this._persistRemovedItem(removedItem)) {
      let removedItemIndex = this.props.selectedRepositories.indexOf(removedItem)    
      let selectedRepositories = this.props.selectedRepositories
      selectedRepositories.splice(removedItemIndex, 1)
      this._handleOnChangeEvent(selectedRepositories)
    }
  }

  async _persistAddedItem(addedItem) {
    let seletedRepository = await RepositoryService.addSelected(addedItem)
    return seletedRepository !== null
  }

  async _persistRemovedItem(removedItem) {    
    let removedRepository = await RepositoryService.removeSelected(removedItem)
    return removedRepository !== null
  }

  _handleOnChangeEvent(selectedRepositories) {
    if (this.props.changeHandler) {
      this.props.changeHandler(selectedRepositories)
    }
  }

  render() {
    return (
      <RepositoryContext.Consumer>
        {
          repositoryContext => {
            return (
              <div className="popover-selector-repositories-container">
                <div className="popover-selector-repositories">
                  <div className="popover-selector-repositories-label">Repositories</div>
                  <ReactPopoverSelector
                    items={ repositoryContext.repositories }
                    selectedItems={ this.props.selectedRepositories }
                    onItemAdded={ this._onItemAdded.bind(this) }
                    onItemRemoved={ this._onItemRemoved.bind(this) }
                    onGetTextItem={ this._onGetTextItem.bind(this) }
                    onGetTooltipText={ this._onGetTooltipText.bind(this) }
                  >
                  </ReactPopoverSelector>
                </div>
                <RepositoryButton repositoryContext={ repositoryContext } />
              </div>
            )
          }
        }
      </RepositoryContext.Consumer>  
    )
  }

}

export default PopoverSelectorRepositories
