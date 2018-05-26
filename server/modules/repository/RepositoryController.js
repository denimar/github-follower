import commonConstant from '../../../common/common.constant'
import RepositoryService from './RepositoryService'
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

class RepositoryController {

  constructor(app, sequelize) {
    try {
      const repositoryService = new RepositoryService(sequelize);

      app.get(commonConstant.ENDPOINT.REPOSITORY, repositoryService.fetchAll.bind(repositoryService));
      app.post(commonConstant.ENDPOINT.REPOSITORY_ADD, jsonParser, repositoryService.addItem.bind(repositoryService));    
      app.post(commonConstant.ENDPOINT.REPOSITORY_UPDATE, jsonParser, repositoryService.updateItem.bind(repositoryService));        
      app.post(commonConstant.ENDPOINT.REPOSITORY_REMOVE, repositoryService.remove.bind(repositoryService));                
      app.get(commonConstant.ENDPOINT.SELECTED_REPOSITORY, repositoryService.fetchSelecteds.bind(repositoryService));    
      app.post(commonConstant.ENDPOINT.SELECTED_REPOSITORY_ADD, repositoryService.addSelected.bind(repositoryService));        
      app.post(commonConstant.ENDPOINT.SELECTED_REPOSITORY_REMOVE, repositoryService.removeSelected.bind(repositoryService));            
    } catch (error)   {
      console.log('error creating repository controller : ' + error)
    }
    
  }

}

export default RepositoryController;
