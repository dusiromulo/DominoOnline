const jwt = require("jsonwebtoken");
User = require("../model/user.js");
const jwtSecret = "T(2am2p]<Zx@(amHi/eP4GQ$x2kM:@z{2t:5z2LW";

verifyToken = (token, cb) => {
    jwt.verify(token, jwtSecret, cb);
};

generateAuthToken = (user) => {
    const u = {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
    };

    return jwt.sign(u, jwtSecret, {
        expiresIn: 60 * 60 * 24  // expires in 24 hours
    });
};

generateRefreshToken = (user) => {
    const u = {
        _id: user._id.toString()
    };

    return jwt.sign(u, jwtSecret);
};

getCleanUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
    };
};

module.exports = {
	create: (req, res, next) => {
		// console.log("Create user:");
		const user = new User({ 
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password 
        });

		user.save()
		.then(user => {
			return res.json({
                "user": getCleanUser(user),
                "auth": generateAuthToken(user),
                "refresh": generateRefreshToken(user)
            });
		})
		.catch(err => {
			console.log('[ERROR]', err.message);
			return res.json({error: err.message});
		});
	},

	authenticate: (req, res, next) => {
		// console.log("Authenticate user:");
		User.authenticate(req.body.email, req.body.password, 
			(err, user) => {
				if (err) {
					return res.json({"error": err.message});
                } else {
                    return res.json({
                        "user": getCleanUser(user),
                        "auth": generateAuthToken(user),
                        "refresh": generateRefreshToken(user)
                    });
				}
			}
		);
	},

	profile: (req, res, next) => {
        // console.log("Profile user:", req.body.token);
        const token = req.body.token || req.query.token;
        if (!token) {
            return res.status(401).json({message: "Must pass token"});
        }

        // Check token that was passed by decoding token using secret
        verifyToken(token, function (err, user) {
            if (err && err.name !== 'TokenExpiredError') { // Hacker
                console.log("HACKER!", err);
                return res.status(401).json({
                    success: false,
                    message: 'hacker1'
                });
            } else if (err) { // Token expirado
                return res.status(403).json({
                    success: false,
                    message: 'token_expired'
                });
            }

            return res.json({
                "user": getCleanUser(user),
                "auth": token
            });
        });
	},

    refresh: (req, res, next) => {
        // console.log("Refresh token user:", req.body.token);
        const token = req.body.token || req.query.token;
        if (!token) {
            return res.status(401).json({message: "Must pass token"});
        }

        verifyToken(token, function (err, user) {
            if (err) { // Hacker
                console.log("HACKER!", err);
                return res.status(401).json({
                    success: false,
                    message: 'hacker2'
                });
            }
            User.findOne({"_id": user._id}).then(userModel => {
                if (!userModel) {
                    return res.status(401).json({
                        success: false,
                        message: 'hacker3'
                    });
                }
                return res.json({
                    "user": getCleanUser(userModel),
                    "auth": generateAuthToken(userModel),
                    "refresh": generateRefreshToken(userModel)
                });  
            })
        });
    },

    allowAuthorized: (req, res, next) => {
        // Verifica se existe um token nos headers
        let token = req.headers['authorization'];
        if (!token) return next(); // Se nao existe, continua normalmente a execucao

        token = token.replace('Bearer ', '');
        verifyToken(token, function (err, user) {
            if (err && err.name !== 'TokenExpiredError') { // Algum santo tentando hackear
                console.log("HACKER!", err);
                return res.status(401).json({
                    success: false,
                    message: 'hacker'
                });
            } else if (err) { // Token inválido!
                console.log("TOKEN EXPIRADO!", err);
                return res.status(403).json({
                    success: false,
                    message: 'token_expired'
                });
            } else {
                req.user = user; // Seta o usuario na request, assim basta acessar req.user nas rotas
                next();
            }
        });
    }
};