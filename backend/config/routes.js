const MessageControl = require("../control/message");
const UserControl = require("../control/user");

const userMiddleware = (req, res, next) => {
	if (!req.user) {
		return res.status(403).json({'error': 'Not permitted.'});
	}
	next();
};

module.exports = app => {
	app.get("/message", userMiddleware, MessageControl.getMsgs);
	app.post("/message", userMiddleware, MessageControl.createMsg);

	// User and token management
	app.post("/signup", UserControl.create);
	app.post("/signin", UserControl.authenticate);
	app.post("/profile", UserControl.profile);
	app.post("/refresh", UserControl.refresh);
}