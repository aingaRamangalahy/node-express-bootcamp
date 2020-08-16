const express = require('express');
const { 
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router.route('/')
  .get(
    advancedResults(Bootcamp, 'courses'), 
    getBootcamps
  ) // all bootcamps with advancedResults middleware
  .post(protect, createBootcamp);

router.route('/:id')
  .get(getBootcamp) // single bootcamp
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

// custom routes 
router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

// Upload photo ... protected route
router.route('/:id/photo')
  .put(protect, bootcampPhotoUpload)
  
module.exports = router