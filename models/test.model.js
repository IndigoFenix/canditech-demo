module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
        "id": { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
    });
  
    return Test;
};