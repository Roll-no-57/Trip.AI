// Importing the required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Connect to database using mongoose
// const mongoose = require('mongoose');


// Importing the routes
// const userRoutes = require('./routes/user');
const chat = require('./routes/chat');
const weather = require('./routes/weather')

//declare and configure the app
const app = express()


//Middlewares
app.use(morgan('dev'))    // this is a middleware that logs the request to the console
app.use(express.json())  // this is a middleware that parses the body of the request and converts it to json format and then attaches it to the request object
app.use(
  cors({
    origin: '*',
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
    maxAge: 36000,
  })
); // this is a middleware that allows cross origin resource sharing


//link to routes
// app.use('/api/v1/user', userRoutes);
app.use('/api/v1', chat);
app.use('/api/v1',weather);


//Setting up the connection
const port = process.env.PORT || 3000;  //setting up the port
app.listen(port, console.log(`Server is running on port ${port} . Link : http://localhost:${port}`));

