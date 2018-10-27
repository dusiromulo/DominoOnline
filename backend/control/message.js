var Message = require('../model/message');

module.exports = {
	getMsgs : (req, res, next) => {
		Message.find((err, data) => {
		    if (err) {
		    	console.err(err);
		    	return next(err);
		    }
		    res.json(data);
		});
	}
};