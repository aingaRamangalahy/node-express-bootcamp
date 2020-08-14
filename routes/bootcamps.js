const express = require('express');
const { 
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require('../controllers/bootcamps');
const router = express.Router();

router.route('/')
  .get(getBootcamps) // all bootcamps
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp) // single bootcamp
  .put(updateBootcamp)
  .delete(deleteBootcamp);


module.exports = router