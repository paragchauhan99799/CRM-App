const router = require("express").Router();
const meetingController = require("../../controllers/meetingController");

// Matches with "/api/products"
router.route("/")
  .get(meetingController.findAll)

router.route("/create")  
  .post(meetingController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(meetingController.findById)
  .put(meetingController.update)
  .delete(meetingController.remove);

// matches with "api/products/name"
router
.route("/callByName/:name")
.get(meetingController.findByMeetingName);

module.exports = router;
