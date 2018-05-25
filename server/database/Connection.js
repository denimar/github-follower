import Sequelize from 'sequelize'

class Connection {

  static connect(env) {
    return new Promise((successFn, failureFn) => {
      console.log(`>> MySQL: Connecting to a local database "${env.database.name}"...`);
      const sequelize = new Sequelize(env.database.name, env.database.user, env.database.password, {
        host: env.database.host,
        port: env.database.port,
        dialect: 'mysql',
        operatorsAliases: false,
        query:{ raw: true },
        logging: false, // disable logging; default: console.log
        timezone: env.database.timezone
      });

      sequelize
        .authenticate()
        .then(() => {
          console.log('>> Connection has been established successfully.');

          successFn(sequelize);
        })
        .catch(err => {
          console.error('>> Unable to connect to the database:', err);

          failureFn(err);
        });

    });
  }

}

export default Connection;
