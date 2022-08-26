const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "submissions"
/* TO BE CHANGED */
//const userControllers = require("../controllers/userControllers");
const submissionControllers = require("../2_controllers/submissionControllers");
const authorization = require("../2_middlewares/authorize")
const multer = require("../2_middlewares/multer_config")

//Configuration de la route "submissions"
//L'ordre est important
router.get("/testGetAllPost", authorization.authorize, submissionControllers.getAllSubmissions);
router.get("/:id", authorization.authorize, submissionControllers.getSubmission);
router.post("/testCreatePost", authorization.authorize, multer.uploadImage, submissionControllers.addSubmission);
router.put("/:id", authorization.authorize, multer.uploadImage, submissionControllers.modifySubmisison);
router.delete("/:id", authorization.authorize, submissionControllers.deleteSubmission);

module.exports = router;