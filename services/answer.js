'use strict';

const questionRepository = require('../repositories/question');
const answerRepository = require('../repositories/answer');

exports.create = async(body) => {
	try {
		let obj = await answerRepository.create(body);
		if (obj) return {'success':true,'response':obj};
        else return {'success':false,'error':500,'message':'could not create'};
	} catch (error) {
		console.error(error.message);
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.get = async(user_id,question_id) => {
	if (!user_id) return {'success':false,'error':400,'message':'user_id is required'};
	if (!question_id) return {'success':false,'error':400,'message':'question_id is required'};
	try {
        let question = await questionRepository.findOne(question_id);
		let answer = await answerRepository.findByUserAndQuestion(user_id,question_id);
		if (answer && question) {
            let points = '';
            if (answer.points)
                points = answer.points;
            else {
                if (question.type == 'choice'){
                    let selected_answer = question.data.opts[parseInt(answer.data)];
                    if (selected_answer !== undefined){
                        points = selected_answer.value * question.points;
                    } else {
                        points = 0;
                    }
                } else if (question.type == 'value') {
                    //For value questions, I would make it so each possible answer had a point value, allowing for partial credit.
                    points = 0;
                    for (let i=0;i<question.data.opts.length;i++){
                        if (question.data.opts[i].input == answer.data){
                            points = question.data.opts[i].value * question.points;
                            break;
                        }
                    }
                } else {
                    points = 'N/A';
                }
            }
            return {'success':true,'response':{'question':question,'answer':answer,'points':points}};
        }
		else return {'success':false,'error':404,'message':'Question '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.update = async(id,body) => {
	let update = {};
	let allowed_fields = ['points'];
	for (let i=0;i<allowed_fields.length;i++){
		if (body[allowed_fields[i]] !== undefined){
			update[allowed_fields[i]] = body[allowed_fields[i]];
		}
	}
	try {
		let updated = await answerRepository.update({'id':id},body);
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
		let deleted = await answerRepository.delete(id);
		if (!deleted) return {'success':false,'error':404,'message':'Could not delete answer'};
        return {'success':true};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};