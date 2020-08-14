const express = require('express');
const dotenv = require('dotenv');
// Route files
const bootcamps = require('./routes/bootcamps');

//load dotenv configs
dotenv.config({path: './config/config.env'});

const app = express();
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, 
  console.log(`Server running on ${process.env.NODE_ENV} mode on port : ${PORT}`)
)