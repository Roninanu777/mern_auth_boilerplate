const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Input validators
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User model
const User = require("../../models/User");
const passport = require("passport");

// Register route
// POST api/users/register
router.post("/register", (req,res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne( { email: req.body.email }).then( user => {
        if(user){
            return res.status(400).json( { email: "Email already exists" });
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Using bcryptjs to hash password
            
                bcrypt.hash(newUser.password, 10, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch( err => console.log(err));
                });
            

        }
    }).catch( err => console.log(err));

});

// Login route
// POST api/users/login
router.post("/login", (req, res) => {
    // Validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    //Find user by email
    User.findOne({ email }).then( user => {
        if(!user){
            return res.status(400).json({ emailNotFound: "Email not found" })
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                //user found
                //create jwl payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                //sign token
                jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 31556926 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            }
            else{
                return res.status(400).json({ passwordIncorrect: "Password Incorrect"});
            }
        }).catch( err => console.log(err));
    }).catch( err => console.log(err));

});

module.exports = router;