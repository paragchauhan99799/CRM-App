const router = require("express").Router();
const productRoutes = require("./products");
const userRoutes = require("./users");
const taskRoutes = require("./tasks");
const clientRoutes = require("./clients");
const orderRoutes = require("./orders");
const companyRoutes = require("./company");
const contactRoutes = require("./contact");
const callRoutes = require("./call");
//const meetingRoutes = require("./meeting");
const noteRoutes = require("./notes");
const supplyRoutes = require("./supplies");
const messageRoutes = require("./messages");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/company",companyRoutes);
router.use("/contact",contactRoutes);
router.use("/call",callRoutes);
//router.use("/meeting",meetingRoutes);
router.use("/tasks", taskRoutes);
router.use("/clients", clientRoutes);
router.use("/orders", orderRoutes);
router.use("/notes", noteRoutes);
router.use("/messages", messageRoutes);
router.use("/supplies", supplyRoutes);

module.exports = router;
