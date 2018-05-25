import CredentialController from './/modules/credential/CredentialController'
import RepositoryController from './modules/repository/RepositoryController'
import VersionController from './modules/version/VersionController'

class Routes {

  static init(app, sequelize) {
    try {

      new CredentialController(app, sequelize)
      new RepositoryController(app, sequelize)
      new VersionController(app, sequelize)      

      //sequelize.sync({force: true})

    } catch (err)   {
      console.log('Error loading server routes : ' + err);
    }
  }

}

export default Routes;
