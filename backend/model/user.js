const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String, required: true, unique: true, dropDups: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true}
  },
  { timestamps: true }
);

// Validates unique fields
UserSchema.plugin(uniqueValidator);

// Pre save model
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password);
	next();
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, cb) {
	User.findOne({ email: email })
	.exec(function (err, user) {
		if (err) {
			return cb(err);
		} else if (!user) {
			var err = new Error('Invalid user.');
			err.status = 401;
			return cb(err);
		}
		if(bcrypt.compareSync(password, user.password))
			return cb(null, user);
		else {
			var err = new Error('Invalid password.');
			err.status = 401;
			return cb(err);
		}
	});
}

module.exports = mongoose.model("User", UserSchema);