const express = require('express');
const { 
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');
const router = express.Router();

router.route('/')
  .get(getBootcamps) // all bootcamps
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp) // single bootcamp
  .put(updateBootcamp)
  .delete(deleteBootcamp);

/***custom routes */
router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router