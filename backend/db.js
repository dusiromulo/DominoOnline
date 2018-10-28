var mongoose = require('mongoose');

module.exports = (cbSucc) => {
	const dbRoute = "mongodb://localhost:27017/domino";

	mongoose.connect(
	  dbRoute,
	  { useNewUrlParser: true }
	);
	
	let conn = mongoose.connection;
	conn.once("open", _ => {
		console.log('Connected to db');
		cbSucc();
	});	
	conn.on("error", console.error.bind(console, "MongoDB connection error:"));
	return conn;
};