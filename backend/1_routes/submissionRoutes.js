const express = require("express");
const router = express.Router();

//Importation des controlleurs utilisés pour la route "submissions"
const submissionControllers = require("../2_controllers/submissionControllers");
const authorization = require("../2_middlewares/authorize");
const multer = require("../2_middlewares/multer_config");

//Configuration de la route "submissions"
//L'ordre est important
router.get("/", authorization.authorize, submissionControllers.getAllSubmissions);
router.get("/:id", authorization.authorize, submissionControllers.getSubmission);
router.post("/", authorization.authorize, multer.uploadImage, submissionControllers.addSubmission);
router.put("/:id", authorization.authorize, multer.uploadImage, submissionControllers.modifySubmisison);
router.delete("/:id", authorization.authorize, submissionControllers.deleteSubmission);
router.post("/:id/like", authorization.authorize, submissionControllers.likeSubmission);

module.exports = router;