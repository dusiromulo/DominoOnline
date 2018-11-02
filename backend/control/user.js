const jwt = require("jsonwebtoken");
User = require("../model/user.js");
const jwtSecret = "T(2am2p]<Zx@(amHi/eP4GQ$x2kM:@z{2t:5z2LW";

generateToken = (user) => {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    //app/collections/models
    var u = {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
    };

    return token = jwt.sign(u, jwtSecret, {
        expiresIn: 60 * 60 * 24  // expires in 24 hours
    });
};

getCleanUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
    };
};

module.exports = {
	create : (req, res, next) => {
		console.log("Create:", req.body);
		const user = new User(
			{ name: req.body.name
			, email: req.body.email
			, password: req.body.password });

		user.save()
		.then(user => {
			return res.json({"user": user, "token": generateToken(user)});
		})
		.catch(err => {
			console.log('[ERROR]', err.message);
			return res.json({error: err.message});
		});
	},

	authenticate : (req, res, next) => {
		console.log("Authenticate:", req.body);
		User.authenticate(req.body.email, req.body.password, 
			(err, user) => {
				if(err)
					return res.json({"error": err.message});
				else
				{
                    return res.json({"user": user, "token": generateToken(user)});
				}
			} 
		);
	},

	profile : (req, res, next) => {
        console.log("Profile:", req.body.token);
        const token = req.body.token || req.query.token;
        if (!token) {
            return res.status(401).json({message: "Must pass token"});
        }

        // Check token that was passed by decoding token using secret
        jwt.verify(token, jwtSecret,function (err, user) {

            if (err) return res.json({error: err.message});

            //return user using the id from w/in JWTToken
            User.findOne({
                "_id": user._id
            }).then(user => {
                if (user.length === 0) return res.json({error: "Token invalido!"});

                //Note: you can renew token by creating new token(i.e.
                //refresh it)w/ new expiration time at this point, but I’m
                //passing the old token back.
                // var token = utils.generateToken(user);

                return res.json({
                    "user": getCleanUser(user), // <--- return both user and token
                    "token": token
                });
            });
        });
	}
};