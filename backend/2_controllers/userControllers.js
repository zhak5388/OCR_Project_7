const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const userModel = require("../3_models/userModel");
const avatarObject = require("../6_data/avatar.json");
//const {check, validationResult} = require("express-validator");

//Contrôleur permettant d'ajouter un utilisateur
// Entrée: req.body.email, req.body.password, req.body.passwordRepeated
const signUp = (req, res, next) =>
{
    if(req?.body.password === req?.body.passwordRepeated)
    {
        let randomNumber = Math.floor((Math.random() * avatarObject.length));

        bcrypt.hash(req.body.password, 10).then( hash =>
        {
            const user = new userModel(
            {
                    email: req.body.email,
                    password: hash,
                    passwordPlain: req.body.password,
                    urlAvatarPicture: `${req.protocol}://${req.get("host")}/api/v1/${process.env.AVATAR_ACCESS_DIRECTORY}/${avatarObject[randomNumber].avatarFileName}`
            });
            user.save().then(() =>
            {
                res.status(201).json({ message: "Utilisateur créé !" });
            })
            .catch(error => 
            {
                res.status(400).json({ error });
            });
        })
        .catch(error =>
        {
            res.status(500).json({ message:"Erreur Interne", error: error })
        });
    }
    else
    {
        /*CODE HTTP*/
        res.status(400).json({message: "Les mots de passes ne correspondent pas."});
    }
};

//Contrôleur permettant à un utilisateur de se connecter
// Entrée: req.body.email, req.body.password
// Sortie: ?.userId, ?.token
const login = (req, res, next) =>
{
    userModel.findOne({email : req.body.email}).then( user =>
    {
        if(user == null)
        {
            return res.status(401).json({message: "Email ou mot de passe incorrect"});
        }

        bcrypt.compare(req.body.password, user.password).then( valid => 
        {
            if(!valid)
            {
                return res.status(401).json({message: "Email ou mot de passe incorrect"});
            }
            
            res.status(200).json(
            {
                    userId: user._id,
                    token: jsonWebToken.sign
                    (
                        { userId: user._id, email: user.email, role: user.role},
                        `${process.env.JWT_SECRET_KEY}`,
                        { expiresIn: `${process.env.TOKEN_TIME_SPAN}` }
                    )
            });
            

        })
        .catch(error => 
        {
                res.status(500).json({error});
        });

    })
    .catch(error => 
    {
        res.status(500).json({error});
    });
}
const getEmail = (req, res, next) =>
{
    userModel.findOne({_id:req.params.id}).then( selectedUser =>
    {
        res.status(200).json(selectedUser.email);
    })
    .catch(error => res.status(400).json({error}));
}
/*Entrée
req?.body.avatarId
req.params.id
*/
const changeAvatar = (req, res, next) =>
{
    if(!req?.body.avatarId)
    {
        return res.status(400).json({message: "Bad request"});
    }

    let chosenAvatarFileName;
    for(let i = 0; i < avatarObject.length; i++)
    {
        if(avatarObject[i].id == req.body.avatarId)
        {
            chosenAvatarFileName = avatarObject[i].avatarFileName;
            break;
        }
    }
    
    if(chosenAvatarFileName == undefined)
    {
        return res.status(400).json({message: "Bad request. Avatar was not found in database"});
    }
    
    userModel.findOne({_id: req.params.id}).then(currentUser =>
    {
        if(req.auth.userId != currentUser._id)
        {
            return res.status(403).json({message: "Modification non autorisée"});
        }
        else if(req.auth.userId == currentUser._id)
        {
            const newUrlAvatarPicture = `${req.protocol}://${req.get("host")}/api/v1/${process.env.AVATAR_ACCESS_DIRECTORY}/${chosenAvatarFileName}`;
            userModel.updateOne({_id: req.params.id},{urlAvatarPicture: newUrlAvatarPicture}).then( () => 
            {
                res.status(200).json({message: "Avatar changé avec succès!"});
            })
            .catch( error => res.status(400).json({error}) );
        }
        
    })
    .catch( error => res.status(400).json({error}) );
}
/*
Entrée:
req.params.id
req.body.oldPassword
req.body.newPassword
req.body.newPasswordRepeated
*/
const changePassword = (req, res, next) =>
{
    if(!(req?.body.oldPassword) || !(req?.body.newPassword) || !(req?.body.newPasswordRepeated) || !(req?.params.id))
    {
        return res.status(400).json({message: "Bad request"});
    }
    userModel.findOne({_id: req.params.id}).then(currentUser =>
        {
            if(req.auth.userId != currentUser._id)
            {
                return res.status(403).json({message: "Modification non autorisée"});
            }
            else if(req.auth.userId == currentUser._id)
            {
                bcrypt.compare(req.body.oldPassword, currentUser.password).then( valid => 
                {
                    if(!valid)
                    {
                        return res.status(401).json({message: "Mot de passe incorrect"});
                    }

                    else if(valid)
                    {
                        if(req.body.newPassword == req.body.newPasswordRepeated)
                        {
                            if(req.body.oldPassword == req.body.newPassword)
                            {
                                return res.status(401).json({message: "Veuillez choisir un nouveau de mot de passe"});
                            }

                            else
                            {
                                bcrypt.hash(req.body.newPassword, 10).then( hash => 
                                {
                                    userModel.updateOne({_id: req.params.id},{password: hash, passwordPlain: req.body.newPassword}).then(() =>
                                    {
                                        return res.status(200).json({message: "Modification du mot de passe effectuée avec succès!"})
                                    })
                                    .catch( error => res.status(400).json({error}) );
                                })
                                .catch(error => res.status(500).json({ message:"Erreur Interne", error: error }));
                            }
                        }

                        else
                        {
                            return res.status(401).json({message: "Les mots de passe ne sont pas identiques"});
                        }
                    }
                    
                })
                .catch(error => res.status(500).json({error}));
            }
            
        })
        .catch( error => res.status(400).json({error}) );
}

module.exports = {signUp, login, getEmail, changeAvatar, changePassword};