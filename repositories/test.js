'use strict';

const db = require("../models/");
const Test = db.tests;

exports.create = async(data) => {
    let c = await Test.create(data);
    if (c.dataValues){
        return c.dataValues;
    } else {
        return null;
    }
};

exports.findAll = async(condition) => {
    let data = await Test.findAll({ where: condition });
    for (let i=0;i<data.length;i++){
        data[i] = data[i].dataValues;
    }
    return data;
};

exports.findOne = async(id) => {
    let data = await Test.findByPk(id);
    if (data) return data.dataValues;
    return data;
};

exports.update = async(condition, body) => {
    let num = await Test.update(body, {
        where: condition
    });
    return num;
};

exports.delete = async(id) => {
    let num = await Test.destroy({
        where: { id: id }
    });
    if (num == 1) return true;
    else return false;
};

exports.deleteAll = async() => {
    let count = await Test.destroy({
        where: {},
        truncate: false
    });
    return count;
};