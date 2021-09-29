//const conn = require('../db/conn');
const testService = require('../services/test');
const questionService = require('../services/question');
const answerService = require('../services/answer');

const db = require("../models");

//This is not a normal way of doing unit testing - it's just there until I get a way of setting up sample data.
test('Create a dummy test with one question, retrieve them, answer the question, and then delete everything', async () => {
    //await db.sequelize.sync({ force: true }); //Deletes the whole database. Remove this.
    await db.sequelize.sync();
    let test = await testService.create({});
    expect(test.success).toBe(true);
    let test_id = test.response.id;
    let question = await questionService.create({
        'test_id':test_id,
        'type':"choice",
        'text':"Choose the correct answer",
        'points':100,
        'data':{
            'opts':[
                {'text':'correct','value':1},
                {'text':'wrong1','value':0},
                {'text':'wrong2','value':0}
            ]
        }
    });
    expect(question.success).toBe(true);
    let question2 = await questionService.create({
        'test_id':test_id,
        'type':"value",
        'text':"Write the word 'correct'",
        'points':100,
        'data':{
            'opts':[
                {'input':'correct','value':1},
            ]
        }
    });
    expect(question2.success).toBe(true);
    let result_admin = await questionService.allInTestAdmin(test_id);
    expect(result_admin.success).toBe(true);
    expect(result_admin.response.length).toBe(2);
    expect(result_admin.response[0].text).toBe('Choose the correct answer');
    expect(result_admin.response[0].type).toBe('choice');
    expect(result_admin.response[0].data.opts[0].value).toBe(1);
    let result_candi = await questionService.allInTestCandi(test_id);
    expect(result_candi.success).toBe(true);
    expect(result_candi.response.length).toBe(2);
    expect(result_candi.response[0].data.opts[0].value).toBe(undefined);
    let question_1_id = result_candi.response[0].id;
    let question_2_id = result_candi.response[1].id;
    
    let user_id = 1;

    //Create an answer to the first question
    let answer = await answerService.create({'user_id':user_id,'question_id':question_1_id,'data':"0"});
    expect(answer.success).toBe(true);
    let answer_id = answer.response.id;

    //Try and post an answer to the same question
    let duplicate_answer = await answerService.create({'user_id':user_id,'question_id':question_1_id,'data':"1"});
    expect(duplicate_answer.success).toBe(false);

    let answer2 = await answerService.create({'user_id':user_id,'question_id':question_2_id,'data':"correct"});
    expect(answer2.success).toBe(true);
    let answer2_id = answer2.response.id;

    let answer_obtained = await answerService.get(user_id,question_1_id);
    expect(answer_obtained.success).toBe(true);
    expect(answer_obtained.response.points).toBe(100);

    let answer_2_obtained = await answerService.get(user_id,question_2_id);
    expect(answer_2_obtained.success).toBe(true);
    expect(answer_2_obtained.response.points).toBe(100);

    await testService.delete(test_id);

    //Ideally this should cascade
    await questionService.delete(question_1_id);
    await answerService.delete(answer_id);
    await answerService.delete(answer2_id);
    let deleted_test = await testService.get(test_id);
    expect(deleted_test.success).toBe(false);
    let deleted_question = await questionService.getCandi(question_1_id);
    expect(deleted_question.success).toBe(false);
    let deleted_answer = await answerService.get(answer_id);
    expect(deleted_answer.success).toBe(false);
})