'use strict';

const db = require("../models/");
const Answer = db.answers;

exports.create = async(data) => {
    let c = await Answer.create(data);
    if (c.dataValues){
        return c.dataValues;
    } else {
        return null;
    }
};

exports.findAll = async(condition) => {
    let data = await Answer.findAll({ where: condition });
    for (let i=0;i<data.length;i++){
        data[i] = data[i].dataValues;
    }
    return data;
};

exports.findByUserAndQuestion = async(user_id,question_id) => {
    let data = await Answer.findAll({ where: {
        'user_id':user_id,
        'question_id':question_id
    },limit:1});
    if (data.length > 0){
        return data[0].dataValues;
    } else {
        return null;
    }
};

exports.findOne = async(id) => {
    let data = await Answer.findByPk(id);
    if (data) return data.dataValues;
    return data;
};

exports.update = async(condition, body) => {
    let num = await Answer.update(body, {
        where: condition
    });
    return num;
};

exports.delete = async(id) => {
    let num = await Answer.destroy({
        where: { id: id }
    });
    if (num == 1) return true;
    else return false;
};

exports.deleteAll = async() => {
    let count = await Answer.destroy({
        where: {},
        truncate: false
    });
    return count;
};