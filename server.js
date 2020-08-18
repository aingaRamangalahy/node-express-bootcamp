const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
//load dotenv configs
dotenv.config({path: './config/config.env'});

//Connect to Database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();


app.use(express.json()); //Body parser
app.use(cookieParser()); //cookie parser

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(fileupload()); // File upload

//Security middlewares;
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(helmet()); //set security header
app.use(xss()); // Prevent XSS attacks
const limiter = rateLimit({
  windowMS: 10 * 60* 1000, // 10mins
  max: 100
})
app.use(limiter) // limi request from single IP to 100
app.use(hpp()); // Prevent http param pollution
app.use(cors()) // Enable CORS

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
 
//Error handler
app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 3000;
const server = app.listen(PORT, 
  console.log(`Server running on ${process.env.NODE_ENV} mode on port : ${PORT}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
})