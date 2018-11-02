const Message = require('../model/message');
const indexIO = require('../index');

module.exports = {
	getMsgs: (req, res, next) => {
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
	},

	createMsg: (req, res, next) => {
		if (!req.user) {
			return res.status(403);
		}

		const msg = `${req.user.name}: ${req.body.message}`;
		const message = new Message({string: msg});
		message.save().then(msgModel => {
			indexIO.emitMessage(msgModel);
			return res.json({'error': 0});
		});
	}
};