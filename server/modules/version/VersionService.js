import UserSelectedBranchModel from './UserSelectedBranchModel'

class VersionService {

  constructor(sequelize) {
    this.sequelize = sequelize;
    UserSelectedBranchModel.init(sequelize);
  }

  fetchAllBranches(req, res) {
    let repositoryId = req.params.repositoryId  
    try {
      UserSelectedBranchModel
        .findAll({where: {repositoryId: repositoryId}})
        .then(selectedBranches => {
          res.end(JSON.stringify(selectedBranches));
        })
    } catch (error) {
      console.log(error)
    }
  }

}

export default VersionService