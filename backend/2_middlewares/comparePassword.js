const comparePassword = (req, res, next) => 
{
    if(req?.body.password === req?.body.passwordRepeated)
    {
        req.user.email = req.body.email;
        req.user.password = req.body.password;
        next();
    }
    else
    {
        /*CODE HTTP*/
        res.status(400).json({message: "Les mots de passes ne correspondent pas."});
    }
};