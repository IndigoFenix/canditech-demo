Example tests:

To create a test:
    POST localhost:8080/api/test/
    This will return a test id, which is required for questions.

To create a question:
    POST localhost:8080/api/question/
    This will return a question id, which is required for answers.

    Sample data for multiple choice
    {
        'test_id':1,
        'type':"choice",
        'text':"Choose the correct answer",
        'points':100, <-- Total points
        'data':{
            'opts':[
                {'text':'correct','value':1}, <-- value is multiplied by points
                {'text':'wrong1','value':0},
                {'text':'wrong2','value':0}
            ]
        }
    }

    Sample data for text value question
    {
        'test_id':1,
        'type':"value",
        'text':"Write the word 'correct'",
        'points':100, <-- Total points
        'data':{
            'opts':[
                {'text':'correct','value':1}, <-- multiple accepted answers are possible
                {'text':'corect','value':0.2}
            ]
        }
    }

To obtain a question:
    Including answers:
        GET localhost:8080/api/question/admin/:id
    Removing answers:
        GET localhost:8080/api/question/candi/:id

Users do not actually need to be added for this demo

To add points to a question:
    PATCH localhost:8080/api/answer/:id
    {
        'points':50
    }

To answer a question:
    POST localhost:8080/api/answer/
    {
        'user_id':1,
        'question_id':1,
        'data':"0"
    }

To obtain an answer for a given user for a given question, which inludes the score when relevant
    GET localhost:8080/api/question/:user_id/:question_id