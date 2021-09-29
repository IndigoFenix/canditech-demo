
const questionService = require('../services/question');

exports.create = async(req, res, next) => {
	try {
        let result = await questionService.create(req.body);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.getAdmin = async(req, res, next) => {
	try {
        let result = await questionService.getAdmin(req.params.id);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.getCandi = async(req, res, next) => {
	try {
        let result = await questionService.getCandi(req.params.id);
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
        let result = await questionService.update(req.params.id,req.body);
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
        let result = await questionService.delete(req.params.id);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}