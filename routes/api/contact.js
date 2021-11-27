const router = require("express").Router();
const contactController = require("../../controllers/contactController");

// Matches with "/api/products"
router.route("/")
  .get(contactController.findAll)

router.route("/create")  
  .post(contactController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(contactController.findById)
  .put(contactController.update)
  .delete(contactController.remove);

// matches with "api/products/name"
router
.route("/contactByName/:name")
.get(contactController.findByContactName);

module.exports = router;
