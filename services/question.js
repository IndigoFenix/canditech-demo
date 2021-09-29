'use strict';

const questionRepository = require('../repositories/question');
const { Op } = require("sequelize");

function removeAnswers(question) {
	let data = question.data;
	switch (question.type){
		case 'choice':
			for (let j=0;j<data.opts.length;j++){
				delete data.opts[j].value;
			}
			break;
		case 'value':
			delete data.valid;
			break;
		case 'text':
			break;
	}
	question.data = data;
	return question;
}

exports.create = async(body) => {
	if (!body.test_id) return {'success':false,'error':400,'message':'Test id is required'};
	if (!body.text) return {'success':false,'error':400,'message':'Text is required'};
	if (!body.points) return {'success':false,'error':400,'message':'Points are required'};
	if (!body.data) return {'success':false,'error':400,'message':'Data is required'};
	//Validate data
	let opts;
	switch (body.type){
		case 'choice':
			if (!body.data.opts) return {'success':false,'error':400,'message':'opts are required'};
			opts = body.data.opts;
			for (let i=0;i<opts.length;i++){
				if (!opts[i].text) return {'success':false,'error':400,'message':'text required for option '+i};
				if (opts[i].value === undefined) return {'success':false,'error':400,'message':'value required for option '+i};
			}
			break;
		case 'value':
			if (!body.data.opts) return {'success':false,'error':400,'message':'opts are required'};
			opts = body.data.opts;
			for (let i=0;i<opts.length;i++){
				if (!opts[i].input) return {'success':false,'error':400,'message':'input required for option '+i};
				if (opts[i].value === undefined) return {'success':false,'error':400,'message':'value required for option '+i};
			}
			break;
		case 'text':
			break;
		default:
			return {'success':false,'error':400,'message':'Invalid type!'};
	}

	let data = {
		"test_id": body.test_id,
		"text": body.text,
		"type": body.type,
		"points": body.points,
		"data": body.data
	};
	try {
		let obj = await questionRepository.create(data);
		if (obj) return {'success':true,'response':obj};
        else return {'success':false,'error':500,'message':'could not create'};
	} catch (error) {
		console.error(error.message);
		return {'success':false,'error':500,'message':error.message}
	}
};

//Get for an admin
exports.getAdmin = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		let obj = await questionRepository.findOne(id);
		if (obj) return {'success':true,'response':obj};
		else return {'success':false,'error':404,'message':'Question '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

//Get for a candidate (remove answers)
exports.getCandi = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		let obj = await questionRepository.findOne(id);
		if (obj) {
			obj = removeAnswers(obj);
			return {'success':true,'response':obj};
		}
		else return {'success':false,'error':404,'message':'Question '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

//Gets all questions with a given test id
exports.allInTestAdmin = async(test_id) => {
	try {
		let condition = {'test_id':test_id};
		let obj = await questionRepository.findMany(condition);
		return {'success':true,'response':obj};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

//Gets all questions with a given test id, and removes the answers from the data
exports.allInTestCandi = async(test_id) => {
	try {
		let condition = {'test_id':test_id};
		let items = await questionRepository.findMany(condition);
		for (let i=0;i<items.length;i++){
			items[i] = removeAnswers(items[i]);
		}
		return {'success':true,'response':items};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.update = async(condition,body) => {
	let update = {};
	let allowed_fields = ['text','points','data'];
	for (let i=0;i<allowed_fields.length;i++){
		if (body[allowed_fields[i]] !== undefined){
			update[allowed_fields[i]] = body[allowed_fields[i]];
		}
	}
	try {
		let updated = await questionRepository.update(condition,body);
		if (updated) return {'success':true,'response':1};
		else return {'success':false,'error':404,'message':'Could not update'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.delete = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	
	try {
		let deleted = await questionRepository.delete(id);
		if (deleted) return {'success':true};
		else return {'success':false,'error':404,'message':'Could not delete'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};