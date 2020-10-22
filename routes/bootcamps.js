const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const Bootcamp = require("../models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps) // all bootcamps with advancedResults middleware
  .post(
    protect, // protecte route middleware
    authorize("publisher", "admin"), // autorization middleware
    createBootcamp
  );

router
  .route("/:id")
  .get(getBootcamp) // single bootcamp
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

// custom routes
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Upload photo ... protected route
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
