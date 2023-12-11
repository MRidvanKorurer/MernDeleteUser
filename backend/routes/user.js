const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", userController.getAllUser);

router.post("/", userController.createUser);

router.delete("/:email", userController.deleteUser);

module.exports = router;
