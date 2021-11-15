const router = require("express").Router();
const companyController = require("../../controllers/companyController");

// Matches with "/api/products"
router.route("/")
  .get(companyController.findAll)
  .post(companyController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(companyController.findById)
  .put(companyController.update)
  .delete(companyController.remove);

// matches with "api/products/name"
router
.route("/companyByName/:name")
.get(companyController.findByCompanyName);

module.exports = router;
