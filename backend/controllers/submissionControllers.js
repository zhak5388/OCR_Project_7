const submissionModel = require("../models/submissionModel");
const userModel = require("../models/userModel");
const submissionFunctions = require("../utils.js");
const fs = require("fs");

/*
Optionnel:
req?.query.orderBy = "newest, oldest, mostPopular, lessPopular"
*/
const getAllSubmissions = (req, res, next) => {
    if (req?.query.orderBy == "newest") {
        submissionModel.find().sort({ dateCreation: -1 }).then(allSubmissions => {
            res.status(200).json(allSubmissions);
        })
            .catch(error => res.status(400).json({ error }));
    }

    else if (req?.query.orderBy == "oldest") {
        submissionModel.find().sort({ dateCreation: 1 }).then(allSubmissions => {
            res.status(200).json(allSubmissions);
        })
            .catch(error => res.status(400).json({ error }));
    }

    else if (req?.query.orderBy == "mostPopular") {
        submissionModel.find().sort({ likes: -1 }).then(allSubmissions => {
            res.status(200).json(allSubmissions);
        })
            .catch(error => res.status(400).json({ error }));
    }

    else if (req?.query.orderBy == "lessPopular") {
        submissionModel.find().sort({ likes: 1 }).then(allSubmissions => {
            res.status(200).json(allSubmissions);
        })
            .catch(error => res.status(400).json({ error }));
    }

    else {
        submissionModel.find().sort({ dateCreation: -1 }).then(allSubmissions => {
            res.status(200).json(allSubmissions);
        })
            .catch(error => res.status(400).json({ error }));
    }
}


const getSubmission = (req, res, next) => {
    submissionModel.findOne({ _id: req.params.id }).then(selectedSubmission => {
        res.status(200).json(selectedSubmission);
    })
        .catch(error => res.status(400).json({ error }));
}

//Entrée
/*
FormData
imageContent
textContent
imageContentAlt
*/
const addSubmission = (req, res, next) => {
    let contentObject = submissionFunctions.contentConstructor(req);

    if (!contentObject) {
        return res.status(400).json({ message: "Veuillez inclure au moins un texte ou une image" });
    }

    const submission = new submissionModel(
        {
            userId: req.auth.userId,
            content: contentObject,
            dateCreation: Date.now(),
            lastDateModification: Date.now(),
            lastModifier: req.auth.userId
        });

    submission.save().then(() => {
        res.status(201).json({ message: "Le post a été crée avec succès!" });
    })
        .catch(error => {
            res.status(500).json({ error })
        });
}
/*
L'ID du post est passé en req.params
req.body.imageContent est uniquement fourni si:
    Suppression image existante
    Ajout d'une image
    Mofification image
=> Non fourni lorsque pas de modif.
*/
const modifySubmisison = (req, res, next) => {
    submissionModel.findOne({ _id: req.params.id }).then(currentSubmission => {
        if (currentSubmission?.content.imageUrl) {
            req.body.currentImageUrl = currentSubmission.content.imageUrl;
        }

        let contentObject = submissionFunctions.contentConstructor(req);

        if (req.auth.userId != currentSubmission.userId && req.auth.role != "admin") {
            res.status(401).json({ message: "Utilisateur non autorisé" });
        }
        else if (req.auth.userId == currentSubmission.userId || req.auth.role == "admin") {
            if (req.body.imageContent == "toBeRemoved" || (req?.file && (currentSubmission.content.type != "textOnly"))) {
                if (!currentSubmission?.content.imageUrl) {
                    return res.status(400).json({ message: "Bad Input" });
                }

                if (req.body.imageContent == "toBeRemoved" && currentSubmission.content.type == "imageOnly") {
                    return res.status(400).json({ error: "Impossible de modifier le post en laissant vide" });
                }

                const imageFileName = currentSubmission.content.imageUrl.split(`/${process.env.IMAGE_ACCESS_DIRECTORY}/`)[1];
                fs.unlink(`${process.env.IMAGE_UPLOAD_DIRECTORY}/${imageFileName}`, () => {
                    submissionModel.updateOne({ _id: req.params.id }, { content: contentObject, lastDateModification: Date.now(), lastModifier: req.auth.userId }).then(() => {
                        res.status(200).json({ message: "Modification effectuée avec succès!" });
                    })
                        .catch(error => res.status(400).json({ error }));
                });

            }

            else {
                submissionModel.updateOne({ _id: req.params.id }, { content: contentObject, lastDateModification: Date.now(), lastModifier: req.auth.userId }).then(() => {
                    res.status(200).json({ message: "Modification effectuée avec succès!" });
                })
                    .catch(error => res.status(400).json({ error }));
            }

        }
        else {
            res.status(404).json({ message: "Erreur" });
        }
    });

}

const deleteSubmission = (req, res, next) => {
    submissionModel.findOne({ _id: req.params.id }).then(currentSubmission => {
        if (req.auth.userId != currentSubmission.userId && req.auth.role != "admin") {
            res.status(401).json({ message: "Utilisateur non autorisé" });
        }
        else if (req.auth.userId == currentSubmission.userId || req.auth.role == "admin") {
            if (currentSubmission.content.type !== "textOnly") {
                const imageFileName = currentSubmission.content.imageUrl.split(`/${process.env.IMAGE_ACCESS_DIRECTORY}/`)[1];

                fs.unlink(`${process.env.IMAGE_UPLOAD_DIRECTORY}/${imageFileName}`, () => {
                    submissionModel.deleteOne({ _id: req.params.id }).then(() => {
                        res.status(200).json({ message: "Suppression effectuée avec succès!" });
                    })
                        .catch(error => res.status(400).json({ error }));
                });
            }
            else 
            {
                submissionModel.deleteOne({ _id: req.params.id }).then(() => {
                    res.status(200).json({ message: "Suppression effectuée avec succès!" });
                })
                    .catch(error => res.status(400).json({ error }));
            }
        }
        else {
            res.status(404).json({ message: "Erreur" });
        }
    })
        .catch(error => {
            res.status(500).json({ error });
        });
}
/*
req.body.like
req.params.id
req.auth.userId
*/
const reactionToSubmission = (req, res, next) => {
    if (!req?.body.like || !req.params.id || !(req?.body.like == 1 || req?.body.like == 0)) {
        return res.status(400).json({ error: "Bad request" });
    }

    else if (req.body.like == 1) {
        submissionModel.findOne({ _id: req.params.id, usersLiked: { $in: [req.auth.userId] } }).then(currentSubmission => {
            if (currentSubmission == null) {
                submissionModel.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Ajout de la réaction operé avec succès!" }))
                    .catch(error => res.status(400).json({ error }));
            }
            else {
                res.status(400).json({ error: "La réaction a déjà été ajoutée précédemment" });
            }
        })
            .catch(error => res.status(500).json({ error }));
    }

    else if (req.body.like == 0) {
        submissionModel.findOne({ _id: req.params.id, usersLiked: { $in: [req.auth.userId] } }).then(currentSubmission => {
            if (currentSubmission == null) {
                res.status(400).json({ error: "La réaction a déjà été annulée précédemment ou bien est inexistante" });
            }
            else {
                submissionModel.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
                    .then(() => res.status(200).json({ message: "Annulation de la réaction operée avec succès!" }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
            .catch(error => res.status(500).json({ error }));
    }
}

module.exports = { getAllSubmissions, getSubmission, addSubmission, modifySubmisison, deleteSubmission, reactionToSubmission };