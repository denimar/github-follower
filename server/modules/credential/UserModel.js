import { Model, DataTypes } from 'sequelize'

class UserModel extends Model {
  static init(sequelize) {

    super.init(
      {
        username: {
          type: DataTypes.STRING(35),
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
      },
      {
        modelName: 'user',
        sequelize: sequelize
      }
    )

  }

}

export default UserModel
