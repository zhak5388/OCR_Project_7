const avatarObject = require("../6_data/avatar.json");

const getAllAvatars = (req, res, next) =>
{
    if(avatarObject)
    {
        res.status(200).json(avatarObject);
    }
    else
    {
        res.status(500).json({error: "An error occured"});
    }
}

/*
req.params.id
*/
const getAvatar = (req, res, next) =>
{
    res.status(200).json({message: "test succès ONE", id:req.params.id});
}

module.exports = {getAllAvatars, getAvatar};