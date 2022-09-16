import React, { useState, useEffect } from "react";

const PostComponent = ({postData}) =>
{
    const [userPostEmail, setUserPostEmail] = useState();
    const [userPostAvatar, setUserPostAvatar] = useState();
    const currentUserId = localStorage.getItem("groupomania_id");
    const [currentUserRole, setCurrentUserRole] = useState();
    //const currentUserId = localStorage.getItem("groupomania_userID");

    //console.log(postData);
    //console.log(Date.now() - postData.dateCreation)

    //console.log(currentUserId);

    useEffect(() =>
    {
        const authorizationHeader = new Headers(
        {
            Authorization: "Bearer " + localStorage.getItem("groupomania_token")
        });

        fetch("http://localhost:3050/api/v1/user/" + postData.userId + "/info",
        {
            method: "GET",
            headers: authorizationHeader,
        })
        .then((response) => 
        {
            if (response.ok)
            {
                return response.json();
            }
        })
        .then((userInfo) => 
        {
            //console.log(userEmail);
            setUserPostEmail(userInfo.email);
        })
        .catch(() => alert("Une erreur interne est survenue"));

        fetch("http://localhost:3050/api/v1/user/" + postData.userId + "/avatar",
        {
            method: "GET",
            headers: authorizationHeader,
        })
        .then((response) => 
        {
            if (response.ok)
            {
                return response.json();
            }
        })
        .then((userAvatar) => 
        {
            //console.log(userAvatar.avatarUrl);
            setUserPostAvatar(userAvatar.avatarUrl);
        })
        .catch(() => alert("Une erreur interne est survenue"));

        fetch("http://localhost:3050/api/v1/user/" + currentUserId + "/info",
        {
            method: "GET",
            headers: authorizationHeader,
        })
        .then((response) => 
        {
            if (response.ok)
            {
                return response.json();
            }
        })
        .then((userInfo) => 
        {
            //console.log(userEmail);
            setCurrentUserRole(userInfo.role);
        })
        .catch(() => alert("Une erreur interne est survenue"));

    }, [])

    console.log("Post User")
    console.log(userPostEmail);
    console.log(userPostAvatar);
    console.log("Current User");
    console.log(currentUserId);
    console.log(currentUserRole);

    const timeDifference = (before, now) =>
    {
        let differenceInMinutes = Math.floor((now - before) / 60000);
        let differenceInHours = Math.floor(differenceInMinutes / 60);
        let differenceInDays = Math.floor(differenceInHours / 24);
        let differenceInMonths = Math.floor(differenceInDays / 30);
        let differenceInYears = Math.floor(differenceInMonths /12);
        let result;

        if (differenceInMinutes <= 1) result = `un instant`;
        else if (differenceInMinutes < 60) result = `${differenceInMinutes} minutes`;
        else if (differenceInHours === 1) result = `1 heure`;
        else if (differenceInHours < 24) result = `${differenceInHours} heures`;
        else if (differenceInDays === 1) result = `1 jour`;
        else if (differenceInDays < 30) result = `${differenceInDays} jours`;
        else if (differenceInMonths >= 1 && differenceInMonths < 12) result = `${differenceInMonths} mois`;
        else if (differenceInYears === 1) result = `1 an`;
        else if (differenceInYears > 1) result = `${differenceInYears} ans`;
        else result = `inconnu`;

        return result;
    }
    console.log(timeDifference(postData.dateCreation,Date.now()));

    return(
        <div>
            <div>
                <div><img src={userPostAvatar} alt={"Image de profil de " + userPostEmail}/></div>
                <div>{userPostEmail}</div>
            </div>
            <div>
                {postData.content.text}
            </div>
            {
                (postData.userId === postData.lastModifier) ?
                (
                    (postData.dateCreation === postData.lastDateModification) ?
                    <div>Crée il y a {timeDifference(postData.dateCreation,Date.now())}</div> : <div>Modifié il y a {timeDifference(postData.lastDateModification,Date.now())}</div>
                )
                :
                <div>Modifié par l'administrateur il y a {timeDifference(postData.lastDateModification,Date.now())}</div>
            }
            <div>
                <div>{postData.likes}</div>
                {
                    (postData.userId === currentUserId || currentUserRole === "admin") ?
                    <div>Modifier</div> : null
                }
                                {
                    (postData.userId === currentUserId || currentUserRole === "admin") ?
                    <div>Supprimer</div> : null
                }
            </div>

        </div>
    )
}

export default PostComponent;
/*
<p>{postData.content.text}</p>
{ _id: "631cc40cb0cff230f3318f6e", 
userId: "631cadb98dd29bd0a8cd71c3", 
content: {…}, 
dateCreation: 1662829580858, 
lastDateModification: 1662829580858, 
lastModifier: "631cadb98dd29bd0a8cd71c3", 
likes: 30, 
usersLiked: [], __v: 0 }
*/