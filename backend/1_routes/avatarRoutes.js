const express = require("express");
const router = express.Router();

const avatarControllers = require("../2_controllers/avatarControllers");
const authorization = require("../2_middlewares/authorize");

router.get("/", authorization.authorize, avatarControllers.getAllAvatars);
router.get("/:avatarId", authorization.authorize, avatarControllers.getAvatar);

module.exports = router;