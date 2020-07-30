const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));