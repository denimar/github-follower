import { Model, DataTypes } from 'sequelize'

class UserSelectedBranchModel extends Model {
  static init(sequelize) {

    super.init(
      {
        branchId: {
          type: DataTypes.STRING(50),
          allowNull: false
        }
      },
      {
        modelName: 'user_selected_branch',
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

export default UserSelectedBranchModel