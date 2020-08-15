const express = require('express');
const { 
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

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