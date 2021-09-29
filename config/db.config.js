module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "password",
    DB: "canditech",
    PORT: 3306,
    DIALECT: "mysql",
    POOL: {
      MAX: 5,
      MIN: 0,
      ACQUIRE: 30000,
      IDLE: 10000
    }
};