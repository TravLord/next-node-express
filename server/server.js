// server entry point executed when we run npm start using nodemon for reg mod updates
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

// db
mongoose
.connect(process.env.DATABASE_CLOUD, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB Error => ",err));

// import routes/auth.js & apply as middleware this way we can have many references and seperate modularize our logic
const authRoutes = require('./routes/auth')

// app middlewares
app.use(morgan('dev')); //shows our request codes in console
app.use(bodyParser.json()); // parses json body from requests

// MAKE SURE WE ARE ONLY ALLOWING REQUESTS FROM OUR CLIENT DOMAIN
app.use(cors({origin: process.env.CLIENT_URL}));

// middlewares , pass all incoming requests to authRoutes
app.use('/api', authRoutes);


//define port where app will run dynamic url or 8000 and listen
const port = process.env.PORT || 8000 

app.listen(port, () => console.log(`Api is running on port ${port}`));