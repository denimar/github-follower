import RepositoryModel from './RepositoryModel'
import UserSelectedRepositoryModel from './UserSelectedRepositoryModel'

class RepositoryService {

    constructor(sequelize) {
        this.sequelize = sequelize;
        RepositoryModel.init(sequelize);
        UserSelectedRepositoryModel.init(sequelize);        
    }
    
    fetchAll(req, res) {
        try {
            RepositoryModel.findAll().then(repositories => {
                res.end(JSON.stringify(repositories));
            })
        } catch (error) {
          console.log(error)
        }
    }

    remove(req, res) {
        let repositoryId = req.params.repositoryId
        RepositoryModel.destroy({
            where: { id: repositoryId }
        }).then(removedRepository => {
            res.end('true');
        }).catch(error => {
            res.status(500).send('Error removing repository : ' + error);
        })
    }      

    addItem(req, res) {
        let body = req.body
        RepositoryModel.create({
            fullName: body.login + '/' + body.name
        }).then(createdRepository => {
            res.end(JSON.stringify(createdRepository));
        }).catch(error => {
            res.status(500).send('Error adding repository : ' + error);
        })        
    }    

    updateItem(req, res) {
        let body = req.body
        RepositoryModel.update(
            { fullName: body.login + '/' + body.name },
            { where: { id: body.id }}
        ).then(updatedRepository => {
            res.end(JSON.stringify(updatedRepository));
        }).catch(error => {
            res.status(500).send('Error updating repository : ' + error);
        })        
    }    
    
    fetchSelecteds(req, res) {
        try {
            UserSelectedRepositoryModel.findAll({
                attributes: [],
                raw: true,
                include: [{
                    attributes: ['id', 'fullName'],
                    model: this.sequelize.models.repository
                }]    
            })
            .then(repositories => {
                res.end(JSON.stringify(repositories));
            })
        } catch (error) {
          console.log(error)
        }
    }

    addSelected(req, res) {
        let repositoryId = req.params.repositoryId
        UserSelectedRepositoryModel.create({
            repositoryId: repositoryId,
            userId: 1 //#HARDCODE --- It must be the connected user id
        }).then(response => {
            res.end(JSON.stringify(response.dataValues));
        }).catch(error => {
            res.status(500).send('Error persisting selected repository : ' + error);
        })
    }

    removeSelected(req, res) {
        let repositoryId = req.params.repositoryId
        UserSelectedRepositoryModel.destroy({
            where: { repositoryId: repositoryId }
        }).then(removedRepository => {
            res.end('true');
        }).catch(error => {
            res.status(500).send('Error removing selected repository : ' + error);
        })
    }    


}

export default RepositoryService