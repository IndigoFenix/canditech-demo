'use strict';

const testRepository = require('../repositories/test');
const questionRepository = require('../repositories/question');

exports.create = async(body) => {
	let data = {};
	try {
		let obj = await testRepository.create(data);
		if (obj) return {'success':true,'response':obj};
        else return {'success':false,'error':500,'message':'could not create'};
	} catch (error) {
		console.error(error.message);
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.get = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		let obj = await testRepository.findOne(id);
		if (obj) return {'success':true,'response':obj};
		else return {'success':false,'error':404,'message':'Question '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.all = async(condition) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		let obj = await testRepository.findMany(condition);
		return {'success':true,'response':obj};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.update = async(condition,body) => {
	let update = {};
	let allowed_fields = [];
	for (let i=0;i<allowed_fields.length;i++){
		if (body[allowed_fields[i]] !== undefined){
			update[allowed_fields[i]] = body[allowed_fields[i]];
		}
	}
	try {
		let updated = await testRepository.update(condition,body);
		if (updated) return {'success':true,'response':1};
		else return {'success':false,'error':404,'message':'Could not update'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.delete = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	
	try {
        //Do this automatically using cascading
		let deleted_test = await testRepository.delete(id);
        if (!deleted_test) return {'success':false,'error':404,'message':'Could not delete test'};
        let deleted_questions = await questionRepository.deleteAllInTest(id);
		if (!deleted_questions) return {'success':false,'error':404,'message':'Could not delete questions'};
        return {'success':true};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};