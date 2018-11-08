const Message = require('../model/message');
const indexIO = require('../index');

module.exports = {
	getMsgs: (req, res, next) => {
		console.log("get msgs!");
		
		Message
		.find()
		.populate('user', 'name')  // substitui nos modelos retornados de mensagens o _id do user por um dicionario {name: user.name}
		.exec((err, data) => {
			if (err) {
				console.error(err);
				return next(err);
			}
			
			return res.json(data);
		});
	},
	createMsg: (req, res, next) => {
		const message = new Message({string: req.body.message, user: req.user._id});
		message.save().then(msgModel => {
			msgModel.populate('user', /*'name',*/ function(err) {
				console.log('MODEL MSG POPULATE USER', msgModel.user);
				indexIO.emitMessage(msgModel);
				return res.json({'error': 0});
			});
		});
	}
};