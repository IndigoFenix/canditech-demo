const Test = require('./test.model');

module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        "id": { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        "test_id": { type: Sequelize.INTEGER },
        "type": { type: Sequelize.STRING, allowNull: false },
        "text": { type: Sequelize.TEXT },
        "points": { type: Sequelize.FLOAT },
        "data": { type: Sequelize.JSON }
    });

    return Question;
};
/*
  id INT AUTO_INCREMENT,
  test_id INT,
  text VARCHAR(255) NOT NULL,
  points FLOAT NOT NULL DEFAULT 0,
  data JSON,
  PRIMARY KEY (id),
  FOREIGN KEY (test_id)
      REFERENCES tests (id)
      ON UPDATE RESTRICT ON DELETE CASCADE*/