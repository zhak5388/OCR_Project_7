import React, { useState, useEffect, useContext } from "react";
import { ReloadContext } from "./ReloadComponent";

const PostComponent = ({ postData }) => {
    const [userPostEmail, setUserPostEmail] = useState();
    const [userPostAvatar, setUserPostAvatar] = useState();
    const currentUserId = localStorage.getItem("groupomania_id");
    const [currentUserRole, setCurrentUserRole] = useState();
    const reload = useContext(ReloadContext);

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
        // eslint-disable-next-line
    }, [])

    const deletePost = (postId) => {
        const authorizationHeader = new Headers(
            {
                Authorization: "Bearer " + localStorage.getItem("groupomania_token")
            });


        fetch(`http://localhost:3050/api/v1/submission/${postId}`,
            {
                method: "DELETE",
                headers: authorizationHeader,
            })
            .then((response) => {
                if (response.ok) {
                    reload.setHomePage(true);
                }
                else {
                    alert("Suppression Impossible");
                }
            })
            .catch(() => alert("Une erreur interne est survenue"));
    }

    const likePost = (postId, action) => {
        const authorizationHeader = new Headers(
            {
                Authorization: "Bearer " + localStorage.getItem("groupomania_token"),
                "Content-Type": "application/json",
            });
        fetch(`http://localhost:3050/api/v1/submission/${postId}/like`,
            {
                method: "POST",
                headers: authorizationHeader,
                body: JSON.stringify({ like: action }),
            })
            .then((response) => {
                if (response.ok) {
                    reload.setHomePage(true);
                }
                else {
                    alert("Action Impossible");
                }
            })
            .catch(() => alert("Une erreur interne est survenue"));
    }

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
        <div className="post-box">
            <div className="post-box__author">
                <div className="post-box__author__avatar"><img src={userPostAvatar} alt={"Image de profil de " + userPostEmail} /></div>
                <div className="post-box__author__username">{userPostEmail}</div>
            </div>
            {(postData.content.type === "textOnly") ?
                <textarea readonly="readonly" className="post-box__content post-box__content--textOnly">
                    {postData.content.text}
                </textarea> : null
            }
            {(postData.content.type === "imageOnly") ?
                <div className="post-box__content post-box__content--imageOnly">
                    <a href={postData.content.imageUrl}><img src={postData.content.imageUrl} alt={postData.content.imageAlt} /></a>
                </div> : null}
            {(postData.content.type === "textAndImage") ?
                <div className="post-box__content post-box__content--textAndImage">
                    <textarea readonly="readonly">{postData.content.text}</textarea>
                    <div className="post-box__content post-box__content--textAndImage__imageContainer">
                        <a href={postData.content.imageUrl}><img src={postData.content.imageUrl} alt={postData.content.imageAlt} /></a>
                    </div>
                </div> : null}
            <div className="post-box__interaction">
                <div className="post-box__interaction__like">
                    <div
                        onClick={() => {
                            if (postData.usersLiked.includes(currentUserId)) {
                                likePost(postData._id, "0");
                            }
                            else {
                                likePost(postData._id, "1");
                            }
                        }}
                        className="post-box__interaction__like__action">{postData.usersLiked.includes(currentUserId) ? <i className="fa-solid fa-heart liked"></i> : <i className="fa-regular fa-heart"></i>} 
                    </div>
                    <div className="post-box__interaction__like__number">{postData.likes}</div>
                </div>
                
                {
                    (postData.userId === currentUserId || currentUserRole === "admin") ?
                    <div className="post-box__interaction__editdelete">
                        <div
                            onClick={() =>
                            {
                                window.location.href = `../editPost/${postData._id}`;
                            }}
                            className="post-box__interaction__editdelete__button other_button">
                            Modifier
                        </div>
                        <div
                        onClick={() => {
                            if (window.confirm("Voulez vous supprimer cette publication?")) {
                                deletePost(postData._id);
                            }
                        }}
                        className="post-box__interaction__editdelete__button other_button">
                        Supprimer
                    </div></div>: null
                }
            </div>
            {
                (postData.userId === postData.lastModifier) ?
                    (
                        (postData.dateCreation === postData.lastDateModification) ?
                            <div className="post-box__info">Crée il y a {timeDifference(postData.dateCreation, Date.now())}</div> : <div className="post-box__info">Modifié il y a {timeDifference(postData.lastDateModification, Date.now())}</div>
                    )
                    :
                    <div className="post-box__info post-box__info--administrateur">Modifié par l'administrateur il y a {timeDifference(postData.lastDateModification, Date.now())}</div>
            }

        </div>
    )
}

export default PostComponent;