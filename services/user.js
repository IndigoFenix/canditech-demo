const userRepository = require('../repositories/user');

exports.create = async(body) => {
	let data = {};
	try {
		let obj = await userRepository.create(data);
		if (obj) return {'success':true,'response':obj};
        else return {'success':false,'error':500,'message':'could not create'};
	} catch (error) {
		console.error(error.message);
		return {'success':false,'error':500,'message':error.message}
	}
};