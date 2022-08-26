const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const userModel = require("../3_models/userModel");
//const {check, validationResult} = require("express-validator");

//Contrôleur permettant d'ajouter un utilisateur
// Entrée: req.body.email, req.body.password, req.body.passwordRepeated
const signUp = (req, res, next) =>
{
    if(req?.body.password === req?.body.passwordRepeated)
    {
        let randomNumber = Math.floor((Math.random() * 3) + 1);

        bcrypt.hash(req.body.password, 10).then( hash =>
        {
            const user = new userModel(
            {
                    email: req.body.email,
                    password: hash,
                    passwordPlain: req.body.password,
                    urlAvatarPicture: `${req.protocol}://${req.get("host")}/public/avatar/avatar_${randomNumber}.jpg`
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
/* TO BE CHANGED */
//module.exports = {signUp, login};
module.exports = {signUp, login};