const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "submissions"
/* TO BE CHANGED */
//const userControllers = require("../controllers/userControllers");
const submissionControllers = require("../2_controllers/submissionControllers");
const authorization = require("../2_middlewares/authorize")
const multer = require("../2_middlewares/multer_config")

//Configuration de la route "submissions"
router.post("/testCreatePost", authorization.authorize, multer.uploadImage, submissionControllers.addSubmission);

module.exports = router;