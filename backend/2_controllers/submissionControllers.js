const submissionModel = require("../3_models/submissionModel");
const userModel = require("../3_models/userModel");
const submissionFunctions = require("../utils.js");
const fs = require("fs");

const getAllSubmissions = (req, res, next) =>
{
    submissionModel.find().then(allSubmissions => 
    {
        res.status(200).json(allSubmissions);
    })
    .catch(error => res.status(400).json({error}));
}

//le req.params doit se mettre dans le front?
const getSubmission = (req, res, next) =>
{
    //console.log(req.params);
    submissionModel.findOne({_id: req.params.id}).then(selectedSubmission => 
    {
        res.status(200).json(selectedSubmission);
    })
    .catch(error => res.status(400).json({error}));
}

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
/*
L'ID du post est passé en req.params

*/
const modifySubmisison = (req, res, next) =>
{
    //Permet d'avoir un content bon
    let contentObject = submissionFunctions.contentConstructor(req);
    console.log(contentObject);

    submissionModel.findOne({_id: req.params.id}).then( currentSubmission =>
    {
        if(req.auth.userId != currentSubmission.userId && req.auth.role != "admin")
        {
            res.status(401).json({message: "Utilisateur non autorisé"});
        }
        else if(req.auth.userId == currentSubmission.userId || req.auth.role == "admin")
        {
            if(req.auth.role == "admin")
            {
                console.log("Admin POWEER");
                res.status(200).json({message: "your are the admin"});
            }
            else
            {
                //res.status(200).json(currentSubmission);
                res.status(200).json({message: "your are the owner"});
            }
            /*
            submissionModel.updateOne({_id: req.params.id},{}).then( () => 
            {
                res.status(200).json({message: "Modification succès"})
            })
            .catch( error => res.status(400).json({error}) );
            */
            

        }
        else
        {
            res.status(404).json({message: "Erreur"});
        }
    });

}

const deleteSubmission = (req, res, next) =>
{
    submissionModel.findOne({_id: req.params.id}).then( currentSubmission => 
    {
        console.log("Logged User: " + req.auth.userId);
        console.log("Proprietaire : " + currentSubmission.userId);
        console.log("User Role : " + req.auth.role);
        /* Peut être utiliser une fonction async pour recuperer le role au lieu de passer par token
        let userRole;
        userModel.findOne({_id: req.auth.userId}).then( user => {userRole = user.role });
        */
        
        if(req.auth.userId != currentSubmission.userId && req.auth.role != "admin")
        {
            res.status(401).json({message: "Utilisateur non autorisé"});
        }
        else if(req.auth.userId == currentSubmission.userId || req.auth.role == "admin")
        {
            const imageFileName = currentSubmission.content.imageUrl.split(`/${process.env.IMAGE_ACCESS_DIRECTORY}/`)[1];
            console.log(imageFileName);

            if(req.auth.role == "admin"){console.log("Admin POWEER")};
            
            fs.unlink(`${process.env.IMAGE_UPLOAD_DIRECTORY}/${imageFileName}`, () =>
            {
                submissionModel.deleteOne({_id: req.params.id}).then( () => 
                {
                    res.status(200).json(currentSubmission);
                    //res.status(200).json({message: "Suppression effectuée avec succès!"});
                })
                .catch(error => res.status(400).json({error}));
            });
        }
        else
        {
            res.status(404).json({message: "Erreur"});
        }
    })
    .catch( error => 
    {
        res.status(500).json({ error });
    });

}

module.exports = {getAllSubmissions, getSubmission, addSubmission, modifySubmisison, deleteSubmission};