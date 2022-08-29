//Entrée
/*
Body
req.body (.textContent  .imageContentAlt)
req.auth.email
req.file

///Pour la modification
req.body.imageContent (contient soit url, soit "toBeRemoved", respectivement pour convervation image ou suppression)

FormData
imageContent
textContent
imageContentAlt
*/

function contentConstructor(req)
{
    let contentObjectToTreat = req?.body;
    contentObjectToTreat = JSON.parse(JSON.stringify(contentObjectToTreat));

    if(req?.file)
    {
        contentObjectToTreat.imageContent = `${req.protocol}://${req.get("host")}/api/v1/${process.env.IMAGE_ACCESS_DIRECTORY}/${req.file.filename}`;
    }
    else 
    {
        if (req?.body.imageContent == "toBeRemoved")
        {
            contentObjectToTreat.imageContent = "";
        }

        else if(req?.body.currentImageUrl)
        {
            contentObjectToTreat.imageContent = req.body.currentImageUrl;
        }

        else
        {
            contentObjectToTreat.imageContent = "";
        }
    }

    let userEmail = req?.auth.email;
    let contentObject;
    
    for (const key in contentObjectToTreat)
    {
        if(contentObjectToTreat[key].length == 0)
        {
            delete contentObjectToTreat[key];
        } 
    }
    
    if(contentObjectToTreat?.hasOwnProperty("textContent") && contentObjectToTreat?.hasOwnProperty("imageContent"))
    {
        contentObject = 
        {
            "type": "textAndImage",
            "text": contentObjectToTreat.textContent,
            "imageUrl": contentObjectToTreat.imageContent
        }
    }

    else if(contentObjectToTreat?.hasOwnProperty("textContent"))
    {
        contentObject = 
        {
            "type": "textOnly",
            "text": contentObjectToTreat.textContent
        }
    }

    else if(contentObjectToTreat?.hasOwnProperty("imageContent"))
    {
        contentObject = 
        {
            "type": "imageOnly",
            "imageUrl": contentObjectToTreat.imageContent
        }
    }

    if(contentObject?.hasOwnProperty("imageUrl"))
    {
        if(contentObjectToTreat?.hasOwnProperty("imageContentAlt"))
        {
            contentObject.imageAlt = contentObjectToTreat.imageContentAlt;
        }
        else if(userEmail)
        {
            contentObject.imageAlt = `Image envoyée par ${userEmail}`
        }
        else
        {
            contentObject.imageAlt = "Image envoyée par l'utilisateur(trice)";
        }
    }
    

    return contentObject;
}

module.exports = {contentConstructor}