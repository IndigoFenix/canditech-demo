
const answerService = require('../services/answer');

exports.create = async(req, res, next) => {
	try {
        let result = await answerService.create(req.body);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.get = async(req, res, next) => {
	try {
        let result = await answerService.get(req.params.user_id,req.params.question_id);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.update = async(req, res, next) => {
	try {
        let result = await answerService.update(req.params.id,req.body);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.delete = async(req, res, next) => {
	try {
        let result = await answerService.delete(req.params.id);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}