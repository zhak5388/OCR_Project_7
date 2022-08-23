const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "utilisateurs"
/* TO BE CHANGED */
//const userControllers = require("../controllers/userControllers");
const userControllers = require("../2_controllers/userControllers");

//Configuration de la route "utilisateurs"
/* TO BE CHANGED */
//router.post("/signup", userControllers.signUp);
//router.post("/login", userControllers.login);
router.get("/test", userControllers.test);
router.post("/auth/signup", userControllers.signUp);
router.post("/auth/login", userControllers.login);

module.exports = router;