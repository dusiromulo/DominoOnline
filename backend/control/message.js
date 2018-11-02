var Message = require('../model/message');

module.exports = {
	getMsgs : (req, res, next) => {
		if (!req.user) {
			return res.status(403);
		}
		
		Message.find((err, data) => {
			if (err) {
				console.error(err);
				return next(err);
			}
			return res.json(data);
		});
	}
};