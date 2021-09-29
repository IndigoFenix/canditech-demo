'use strict';

const db = require("../models/");
const Test = db.tests;
const Question = db.questions;

exports.create = async(data) => {
    let c = await Question.create(data);
    if (c.dataValues){
        return c.dataValues;
    } else {
        return null;
    }
};

exports.findMany = async(condition) => {
    let data = await Question.findAll({ 'where': condition });
    for (let i=0;i<data.length;i++){
        data[i] = data[i].dataValues;
    }
    return data;
};

exports.findOne = async(id) => {
    let data = await Question.findByPk(id);
    if (data) return data.dataValues;
    else return null;
};

exports.update = async(condition, body) => {
    let num = await Question.update(body, {
        where: condition
    });
    return num;
};

exports.delete = async(id) => {
    let num = await Question.destroy({
        where: { id: id }
    });
    if (num == 1) return true;
    else return false;
};

exports.deleteAll = async() => {
    let count = await Question.destroy({
        where: {},
        truncate: false
    });
    return count;
};

exports.deleteAllInTest = async(test_id) => {
    let count = await Question.destroy({
        where: { 'test_id': test_id },
        truncate: false
    });
    return count;
};