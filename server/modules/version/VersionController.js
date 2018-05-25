import commonConstant from '../../../common/common.constant'
import VersionService from './VersionService'

class VersionController {

  constructor(app, sequelize) {
    const versionService = new VersionService(sequelize);

    app.get(commonConstant.ENDPOINT.BRANCH, versionService.fetchAllBranches);
  }

}

export default VersionController
