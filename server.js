const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
const passport = require("passport");
const users = require("./routes/api/users");
const initializePassport = require("./config/passport");

// Parsing environment variables
dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to MongoDB
var env = process.env.NODE_ENV || 'development';
var MONGO_URI = '';
if(env === 'development'){
    MONGO_URI = process.env.MONGO_URI_DEV;
}
else{
    MONGO_URI = process.env.MONGO_URI_PROD;
}
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Passport initialization
app.use(passport.initialize());

// Passport config
initializePassport(passport);

// Routes
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));