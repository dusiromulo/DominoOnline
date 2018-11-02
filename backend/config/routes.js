const MessageControl = require("../control/message");
const UserControl = require("../control/user");

module.exports = app => {
	app.get("/message", MessageControl.getMsgs);
	app.post("/message", MessageControl.createMsg);
	app.post("/signup", UserControl.create);
	app.post("/signin", UserControl.authenticate);
	app.post("/profile", UserControl.profile);
}