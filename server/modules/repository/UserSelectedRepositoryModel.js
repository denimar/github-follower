import { Model, DataTypes } from 'sequelize'

class UserSelectedRepositoryModel extends Model {
  static init(sequelize) {

    super.init(
      {
        
      },
      {
        modelName: 'user_selected_repository',
        sequelize: sequelize
      }
    )

    this.belongsTo(sequelize.models.repository, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })    
    
    this.belongsTo(sequelize.models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })    

  }

}

export default UserSelectedRepositoryModel