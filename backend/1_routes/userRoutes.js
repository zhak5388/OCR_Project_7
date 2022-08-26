const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "utilisateurs"
/* TO BE CHANGED */
const userControllers = require("../2_controllers/userControllers");
const authorization = require("../2_middlewares/authorize");

//Configuration de la route "utilisateurs"
router.post("/signup", userControllers.signUp);
router.post("/login", userControllers.login);
router.get("/:id/email", authorization.authorize, userControllers.getEmail);
router.post("/:id/avatar", authorization.authorize, userControllers.changeAvatar);
router.post("/:id/password", authorization.authorize, userControllers.changePassword);

module.exports = router;