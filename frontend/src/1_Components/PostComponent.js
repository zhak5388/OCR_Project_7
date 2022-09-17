import React, { useState, useEffect } from "react";

const PostComponent = ({ postData }) => {
    const [userPostEmail, setUserPostEmail] = useState();
    const [userPostAvatar, setUserPostAvatar] = useState();
    const currentUserId = localStorage.getItem("groupomania_id");
    const [currentUserRole, setCurrentUserRole] = useState();

    useEffect(() => {
        const authorizationHeader = new Headers(
            {
                Authorization: "Bearer " + localStorage.getItem("groupomania_token")
            });

        fetch("http://localhost:3050/api/v1/user/" + postData.userId + "/info",
            {
                method: "GET",
                headers: authorizationHeader,
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((userInfo) => {
                setUserPostEmail(userInfo.email);
            })
            .catch(() => alert("Une erreur interne est survenue"));

        fetch("http://localhost:3050/api/v1/user/" + postData.userId + "/avatar",
            {
                method: "GET",
                headers: authorizationHeader,
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((userAvatar) => {
                setUserPostAvatar(userAvatar.avatarUrl);
            })
            .catch(() => alert("Une erreur interne est survenue"));

        fetch("http://localhost:3050/api/v1/user/" + currentUserId + "/info",
            {
                method: "GET",
                headers: authorizationHeader,
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((userInfo) => {
                setCurrentUserRole(userInfo.role);
            })
            .catch(() => alert("Une erreur interne est survenue"));

    }, [])

    const timeDifference = (before, now) => {
        let differenceInMinutes = Math.floor((now - before) / 60000);
        let differenceInHours = Math.floor(differenceInMinutes / 60);
        let differenceInDays = Math.floor(differenceInHours / 24);
        let differenceInMonths = Math.floor(differenceInDays / 30);
        let differenceInYears = Math.floor(differenceInMonths / 12);
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

    return (
        <div>
            <div>
                <div><img src={userPostAvatar} alt={"Image de profil de " + userPostEmail} /></div>
                <div>{userPostEmail}</div>
            </div>
            <div>
                {postData.content.text}
            </div>
            {
                (postData.userId === postData.lastModifier) ?
                    (
                        (postData.dateCreation === postData.lastDateModification) ?
                            <div>Crée il y a {timeDifference(postData.dateCreation, Date.now())}</div> : <div>Modifié il y a {timeDifference(postData.lastDateModification, Date.now())}</div>
                    )
                    :
                    <div>Modifié par l'administrateur il y a {timeDifference(postData.lastDateModification, Date.now())}</div>
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