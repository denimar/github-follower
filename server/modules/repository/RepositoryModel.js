import { Model, DataTypes } from 'sequelize'

class RepositoryModel extends Model {
  static init(sequelize) {

    super.init(
      {
        fullName: {
          type: DataTypes.STRING(80),
          allowNull: false
        }
      },
      {
        modelName: 'repository',
        sequelize: sequelize
      }
    )

  }

}

export default RepositoryModel
