const express = require('express');
const dotenv = require('dotenv');

//load dotenv configs
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on port : ${PORT}`)
)