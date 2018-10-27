const MessageControl = require("../control/message");

module.exports = app => {
	app.get("/message", MessageControl.getMsgs);
}