const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
//load dotenv configs
dotenv.config({path: './config/config.env'});

//Connect to Database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.SERVER_PORT || 3000;
const server = app.listen(PORT, 
  console.log(`Server running on ${process.env.NODE_ENV} mode on port : ${PORT}`)
)

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1))
})