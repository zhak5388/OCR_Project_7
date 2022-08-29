const express = require("express");
const router = express.Router();

const avatarControllers = require("../controllers/avatarControllers");
const authorization = require("../middlewares/authorize");

router.get("/", authorization.authorize, avatarControllers.getAllAvatars);
router.get("/:avatarId", authorization.authorize, avatarControllers.getAvatar);

module.exports = router;