module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
        "id": { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        "user_id": { type: Sequelize.INTEGER },
        "question_id": { type: Sequelize.INTEGER },
        "data": { type: Sequelize.TEXT },
        "points": { type: Sequelize.FLOAT }
    },{
        indexes: [
            {
                name: 'user_question',
                fields: ['user_id', 'question_id'],
                unique: true
            }
        ]
    });
    return Answer;
};