import UserModel from './UserModel'
import axios from 'axios'
import jwt from 'jsonwebtoken'

class CredentialService {

  constructor(sequelize) {
    this.sequelize = sequelize;
    UserModel.init(sequelize);
  }

  fetchAllUsers(req, res) {
    UserModel.findAll({where: {active: true}})
      .then(users => {
        res.end(JSON.stringify(users));
      })
  }

  ensureUserExistence(username, companyCode) {
    return new Promise((successFn, failureFn) => {
      try {
        this.sequelize.models.company.findOne({where: {code: companyCode}})
          .then(company => {
            UserModel.findOne({
              where: {
                username: username,
                companyId: company.id,
                active: true
              }
            })
              .then(foundUser => {
                if (foundUser) {
                  successFn(foundUser);
                } else { //At this point, the user exist in CO and there isn't in TripManager, so it has to be created
                  this.createNewUser(username, company.id).then(createdUser => {
                    successFn(foundUser);
                  })
                }
              })
        });
      } catch (error)   {
        console.log('Error checking user existence: ' + error)
      }
    })
  }

  createNewUser(username, companyId) {
    return new Promise((successFn, failureFn) => {
      try {
        UserModel.create({
          username: username,
          companyId: companyId
        }).then(() => {
          UserModel.findOne({where: {username: username, companyId: companyId}}).then(createdUser => {
            if (createdUser) {
              successFn(createdUser)
            } else {
              failureFn()
            }
          })
        })
      } catch (error)   {
        console.log('Error creating a new user: ' + error)
        failureFn()
      }
    })
  }

  static async getAutorizationData(sequelize, req) {
    let authorizationToken = req.header('authorization');
    let decoded = jwt.decode(authorizationToken, {complete: true})
    let authorizationData = decoded.payload
    authorizationData.userId = await CredentialService.getUserId(sequelize, authorizationData.company, authorizationData.username)
    return authorizationData;
  }

  static getUserId(sequelize, company, username) {
    return new Promise((successFn, failureFn) => {
      try {
        UserModel.findOne({
          attributes: ['id'],
          raw: true,
          include: [
            {
              model: sequelize.models.company,
              attributes: [],
              where: {code: company}
            }
          ],
          where: {
            username: username,
            active: true
          }
        })
        .then(response => {
          successFn(response.id)
        })
        .catch(error => {
          console.log(error)
          failureFn(error)
        })
      } catch (error)   {
        console.log(error)
      }
    })
  }

}

export default CredentialService;
