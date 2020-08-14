const express = require('express');
const dotenv = require('dotenv');

//load dotenv configs
dotenv.config({path: './config/config.env'});

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, message :`show all bootcamps`})
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message : `get bootcamp ${req.params.id}`})
});

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, message :`create bootcamp`})
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message :`Update bootcamp ${req.params.id}`})
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message :`Delete bootcamp ${req.params.id}`})
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, 
  console.log(`Server running on ${process.env.NODE_ENV} mode on port : ${PORT}`)
)