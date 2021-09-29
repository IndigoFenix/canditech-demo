const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.POOL.MAX,
    min: dbConfig.POOL.MIN,
    acquire: dbConfig.POOL.ACQUIRE,
    idle: dbConfig.POOL.IDLE
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tests = require("./test.model.js")(sequelize, Sequelize);
db.questions = require("./question.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.answers = require("./answer.model.js")(sequelize, Sequelize);

module.exports = db;