import React from 'react'
import '../../styles/core.scss'
import './App.scss'
import Header from './Header'
import RoutesViewport from './RoutesViewport'
import TabViewSelector from '../TabViewSelector'
import PopoverSelectorRepositories from '../PopoverSelectorRepositories'
import Login from './Login'
import Clock from '../Clock'
import axios from 'axios'
import RepositoryService from '../../services/RepositoryService'
import { RepositoryContext } from '../../contexts/RepositoryContext'

class App extends React.Component {

  constructor() {
    super();
    //this.state = { allRepositories: [], selectedRepositories: [] }
    this.state = {
      repositories: [],
      setRepositories: data => {
        this.setState({ repositories: data })
      },
      selectedRepositories: []
    }  
  }

  async componentDidMount() {
    let repositories = await RepositoryService.fetchAll()
    let selectedRepositories = await RepositoryService.fetchSelecteds()
    this.setState({ repositories, selectedRepositories })
  }

  _popoverSelectorRepositoriesChangeHandler(selectedRepositories) {
    this.setState({ selectedRepositories })
  }

  render() {
    return (
      <div className="app-container">      
        <div>
          <Header />
          <TabViewSelector />
        </div>

        <RepositoryContext.Provider value={{ repositories: this.state.repositories, setRepositories: this.state.setRepositories }}>                
          <PopoverSelectorRepositories 
            selectedRepositories={ this.state.selectedRepositories }
            changeHandler={ this._popoverSelectorRepositoriesChangeHandler.bind(this) }
          />
          <RoutesViewport repositories={ this.state.selectedRepositories } />
        </RepositoryContext.Provider>          
      </div>  
    )
  }

}

export default App