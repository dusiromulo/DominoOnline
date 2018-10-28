User = require("../model/user.js");

module.exports = {

	// Create
	//
	// In:  name Nome do usuario
	//	 	email Email de usuario
	//		password hash da senha do usuario
	create : (req, res, next) => {
		console.log("Req body:", req.body.name);
		const user = new User(
			{ name: req.body.name
			, email: req.body.email
			, password: req.body.password });

		user.save()
		.then(user => {			
			res.json(user);
		})
		.catch(err => {
			console.log('[ERROR]', err.message);
			res.json({error: err.message});
		});
	},

	authenticate : (req, res, next) => {
		console.log("Authenticate:", req.body);
		User.authenticate(req.body.email, req.body.password, 
			(err, user) => {
				if(err)
					res.json({error: err.message});
				else
					res.json(user);
			} 
		);
	}
};