const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "utilisateurs"
const userControllers = require("../controllers/userControllers");
const authorization = require("../middlewares/authorize");

//Configuration de la route "utilisateurs"
router.post("/signup", userControllers.signUp);
router.post("/login", userControllers.login);
router.get("/:id/info", authorization.authorize, userControllers.getInfo);
router.post("/:id/avatar", authorization.authorize, userControllers.changeAvatar);
router.post("/:id/password", authorization.authorize, userControllers.changePassword);
router.get("/:id/avatar", authorization.authorize, userControllers.getAvatar);

module.exports = router;