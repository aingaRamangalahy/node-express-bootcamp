const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({success: true, message :`show all bootcamps`})
});

router.get('/:id', (req, res) => {
  res.status(200).json({success: true, message : `get bootcamp ${req.params.id}`})
});

router.post('/', (req, res) => {
  res.status(200).json({success: true, message :`create bootcamp`})
});

router.put('/:id', (req, res) => {
  res.status(200).json({success: true, message :`Update bootcamp ${req.params.id}`})
});

router.delete('/:id', (req, res) => {
  res.status(200).json({success: true, message :`Delete bootcamp ${req.params.id}`})
});

module.exports = router