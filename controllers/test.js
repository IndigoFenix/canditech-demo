
const testService = require('../services/test');

exports.create = async(req, res, next) => {
	try {
        let result = await testService.create(req.body);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.all = async(req, res, next) => {
	try {
        let result = await testService.all();
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
        let result = await testService.get(req.params.id);
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
        let result = await testService.update(req.params.id,req.body);
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
        let result = await testService.delete(req.params.id);
        if (result.success){
            res.status(200).json(result.response);
        } else {
            res.status(result.error).json({ error: result.message })
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}