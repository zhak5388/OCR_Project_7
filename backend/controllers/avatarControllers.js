const avatarObject = require("../data/avatar.json");

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
Entrée:
req.params.avatarId
*/
const getAvatar = (req, res, next) =>
{
    if(!req?.params.avatarId)
    {
        return res.status(400).json({message: "Bad request"});
    }

    let chosenAvatar;
    for(let i = 0; i < avatarObject.length; i++)
    {
        if(avatarObject[i].id == req.params.avatarId)
        {
            chosenAvatar = avatarObject[i];
            break;
        }
    }
    
    if(chosenAvatar == undefined)
    {
        return res.status(400).json({message: "Bad request. Avatar was not found in database"});
    }

    else
    {
        res.status(200).json(chosenAvatar);
    }
}

module.exports = {getAllAvatars, getAvatar};