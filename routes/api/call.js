const router = require("express").Router();
const callController = require("../../controllers/callController");

// Matches with "/api/products"
router.route("/")
  .get(callController.findAll)

router.route("/create")  
  .post(callController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(callController.findById)
  .put(callController.update)
  .delete(callController.remove);

// matches with "api/products/name"
router
.route("/callByName/:name")
.get(callController.findByCallName);

module.exports = router;
