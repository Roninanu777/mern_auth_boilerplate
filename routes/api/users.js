const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Input validators
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User model
const User = require("../../models/User");

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
            bcrypt.getSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch( err => console.log(err));
                });
            });

        }
    });

});