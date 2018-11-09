const MessageControl = require("../control/message");
const UserControl = require("../control/user");
const bodyParser = require('body-parser');

const userMiddleware = (req, res, next) => {
	if (!req.user) {
		return res.status(403).json({'error': 'Not permitted.'});
	}
	next();
};

const allowAccessControl = res => {
    // Allow localhost ou outro
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
};

module.exports = (app, chat) => {
    app.use(function (req, res, next) {
        allowAccessControl(res);
        UserControl.allowAuthorized(req, res, next);
    });

    // To read req.body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

	app.get("/message", userMiddleware, MessageControl.getMsgs);
    app.post("/message", userMiddleware, MessageControl.createMsg,
        (req, res, next) => {
            console.log("Emit msg:", req.msgModel);
            chat.emitMessage(req.msgModel)
        });

	// User and token management
	app.post("/signup", UserControl.create);
	app.post("/signin", UserControl.authenticate);
	app.post("/profile", UserControl.profile);
	app.post("/refresh", UserControl.refresh);
};