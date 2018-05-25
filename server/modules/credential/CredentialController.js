import CredentialService from './CredentialService'
import commonConstant from '../../../common/common.constant'
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

class CredentialController {

  constructor(app, sequelize) {
    const credentialService = new CredentialService(sequelize);

    app.get(commonConstant.ENDPOINT.CREDENTIAL_USER, credentialService.fetchAllUsers)
  }

}

export default CredentialController;
