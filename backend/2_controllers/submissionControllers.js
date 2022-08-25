const submissionModel = require("../3_models/submissionModel");
const submissionFunctions = require("../utils.js");

//Entrée
/*
Body
req.body (.textContent  .imageContentAlt)
req.auth (.email .userId)
req.file

FormData
imageContent
textContent
imageContentAlt
//Misc
req?.body.textContent.length != 0
*/
const addSubmission = (req, res, next) =>
{
    let contentObject = submissionFunctions.contentConstructor(req);

    if(!contentObject)
    {
        return res.status(400).json({message: "Veuillez inclure au moins un texte ou une image"});
    }

    const submission = new submissionModel(
    {
        userId: req.auth.userId,
        content: contentObject,
        dateCreation: Date.now(),
        lastDateModification: Date.now(),
        lastModifier: req.auth.userId
    });

    submission.save().then( () =>
    {
        //res.status(201).json({message: "Le post a été crée avec succès!"});
        res.status(200).json(submission);
    })
    .catch(error => 
    {
        res.status(500).json({error})
    });
}

const addSubmissionDep  = (req, res, next) =>
{
    //let pathImage = `${req.protocol}://${req.get("host")}/api/v1/${process.env.IMAGE_ACCESS_DIRECTORY}/${req.file.filename}`;
    //console.log(pathImage);
    //console.log(req.body);
    //console.log(req.file)
    let a = submissionFunctions.contentConstructor(req);

    if(!a)
    {
        return res.status(400).json({message: "Veuillez inclure au moins un texte ou une image"});
    }
    //console.log(a);
    res.status(200).json(a);

}

module.exports = {addSubmission, addSubmissionDep};