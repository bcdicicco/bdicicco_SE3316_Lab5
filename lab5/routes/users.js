const express = require('express');
const router = express.Router();
const User = require("../models/account");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const eVer = require("../email-verification");

//Register
router.post('/register', (req, res) =>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        __v: req.body.__v,
        usertoken: req.body.usertoken
    });
    
    // Check if a user with that email is already registered
    User.getUserByEmail(newUser.email, (error, user)=>{
        if(error){
            throw error;
        } 
        
        if(user){
              return res.json({
                    success: false,
                    msg: "User already registered!"
            });
        } else{
            User.addUser(newUser, (err, user) =>{
                if(err){
                    res.json({
                        success: false,
                        msg: "Failed to register user"
                    });
                } else{
                    res.json({
                    success: true,
                    msg: "User Registered"
                    });
                    user.__v = 0;
                    eVer.verifyUser(newUser);
                }    
            });
        } 
    });
});

//Authenticate
router.post('/authenticate', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByEmail(email, (err, user) =>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: "User not found"});
        } 
        
        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week 
                });
                
                res.json({
                   success: true,
                   token: 'JWT ' + token,
                   user: {
                       email: user.email,
                      __v: user.__v,
                      user: user.usertoken
                   }
                });
                
            }
            else{
                return res.json({success: false, msg: "Wrong password"});
            }
            
        });
    });
});

// //-----------------------Verification-------------------------------------
router.post('/re-verification-email', function(req, res) {
    var newUser = {
        // _id: req.body._id,
        email: req.body.email,
        passport: req.body.password
        // usertoken: req.body.usertoken
    };
    eVer.reVerifyUser(newUser);
	res.send({success: true, msg: "Your verification email has been sent"});
});

//Verification
router.get('/verify/:verificationToken', function(req, res) {
    var tokenData = req.params.verificationToken;
		eVer.confirmToken(tokenData, function(err) {
			if (err) {
				res.json({
				    success: false,
					error: 'Error verifying email.',
				});
			} else {
				res.json({
					success: true, 
					message: 'Your account is now verified'
				});
			}
		});
});

//----------------------------------------Profile-------------------------------------------------------
//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res) =>{
    res.json({user: req.user});
});

module.exports = router;