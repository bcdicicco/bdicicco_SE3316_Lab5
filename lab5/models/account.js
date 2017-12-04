var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require('../config/database');
const uuid = require('uuid');
const Token = require("token");

'use strict';
const nodemailer = require('nodemailer');
const xoauth2 = require("xoauth2");

//User schema
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    __v: {
        type: Number
    },
    usertoken: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', AccountSchema);

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserByToken = function(token){
    const query = {usertoken: token};
    User.findOne(query);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            console.log("ERROR");
        }
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err){
                throw err;
            } 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){
            throw err;
        }
        callback(null, isMatch);
    });
}

//-------------------------------------------Mail Config---------------------------------------
var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // xoauth2: xoauth2.createXOAuth2Generator({
            type: 'OAuth2',
            user: 'namikazeburst@gmail.com',
            clientId: '76227631437-93j8pbsfgfmn47er8jnm1qrcrs4k6og0.apps.googleusercontent.com ',
            clientSecret: 'rbq0cTwwwYlx6XDdyBIN3-Og',
            refreshToken: '1/Y8ifWe4Y9oKLwWoW_Yfu3mswSjW_dUkUlEZA_LRVbbc'
        // }) 
    }
});

module.exports.sendEmail = function(user, verificationTokenData){
    var verificationUrl = "https://lab05-bdicicco.c9users.io:8081/users/verify/" + verificationTokenData;
    var emailBody = '<p>Thanks for signing up to the NASA Image Collection.<br/>Verify your email by clicking the following link: <a href="' + 
        verificationUrl + '" target="_blank"> Click me</a></p>';
    
    var mailOptions = {
        from: 'Brandon <namikazeburst@gmail.com>',
        to: user.email,
        subject: 'Nasa Image Collections',
        html: emailBody
    }
    
    transport.sendMail(mailOptions, (err, res) => {
        if(err){
            console.log(err); return false;
        } else {
            console.log("Email sent"); return true;
        }
    }); 
}

//---------------------------------------------------------------------------------------------------
// module.exports.sendAndVerify = function(user){
   
// 	// create verification token
//     var newToken = new Token({
// 	    created: new Date(),
// 		expires: new Date(Date.now() + (1000 /*milisec*/ * 60 /*sec*/ * 60 /*min*/ * 24 /*hr*/ * 30 /*days*/)),
// 		data: uuid(),
// 		category: 'EmailVerification',
// 		recipientId: user.email,
//     });
	    
// 	newToken.save({ validateBeforeSave: true }, function(err, verificationToken) {
// 		if (err) { return console.log(err); }
// 		// send email
// 		var verificationUrl = "http://" + global.__environmentDomainName + "/verify/" + verificationToken.data;
// 		var emailBody = '<p>Hey, <br/>Verify your email by clicking the following link: <a href="' + verificationUrl + '" target="_blank"> Click me</a></p>';

// 		if (!User.sendEmail(user, verificationToken, emailBody)) {
// 		    return false;
// 		} 
// 	});

// var confirmToken = function(tokenData, callback) {
// 	    Token.findOne({data: tokenData}).exec(function(err, tok) {
// 		if (err) {
// 			return callback(err);
// 		}
// 		if (tok) {
// 			if (new Date() < new Date(tok.expires)) {
// 				User.getUserByEmail(tok.recipientId).exec(function(err, user) {
// 					if (err || !user) {
// 						return callback(new Error('User does not exist'));
// 					};
// 					user.email.isVerified = true;
// 					user.save({validateBeforeSave: true}, callback);
// 				});
// 			} else {
// 				callback(new Error('Token expired.'));
// 			};
// 			Token.findByIdAndRemove(tok._id, function() {});
// 		} else {
// 			callback(new Error('Token does not exist.'));
// 		};
// 	});
// };
// }