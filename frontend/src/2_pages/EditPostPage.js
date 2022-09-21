import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditPostComponent from "../1_Components/EditPostComponent";
import FooterComponent from "../1_Components/FooterComponent";
import HeaderComponent from "../1_Components/HeaderComponent";


const EditPostPage = () => {

    const { postId } = useParams();
    const [isUserAuthorized, setAuthorisationResult] = useState("unknown");
    const [currentPost, setCurrentPost] = useState();

    useEffect(() => {
        const authorizationHeader = new Headers(
            {
                Authorization: "Bearer " + localStorage.getItem("groupomania_token")
            });
        const currentUserId = localStorage.getItem("groupomania_id");
        let currentUserRoleF = "lambda";
        fetch("http://localhost:3050/api/v1/user/" + currentUserId + "/info",
            {
                method: "GET",
                headers: authorizationHeader,
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return false;
                }
            })
            .then((userInfo) => {
                if (userInfo === false) {
                    setAuthorisationResult(false);
                }
                else {
                    currentUserRoleF = userInfo.role;
                    fetch(`http://localhost:3050/api/v1/submission/${postId}`,
                        {
                            method: "GET",
                            headers: authorizationHeader,
                        })
                        .then((response) => {
                            //console.log(response.status);

                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                return false;
                            }
                        })
                        .then((data) => {
                            if (data === false) {
                                setAuthorisationResult(false)
                            }
                            else {
                                if (currentUserRoleF === "admin" || data.userId === currentUserId) {
                                    setCurrentPost(data);
                                    setAuthorisationResult(true);
                                }
                                else {
                                    setAuthorisationResult(false);
                                }
                            }
                        })
                        .catch(() => {
                            alert("Une erreur interne est survenue. Vous allez être redirigé vers la page de connexion");
                        });
                }
            })
            .catch(() => alert("Une erreur interne est survenue"));
    // eslint-disable-next-line
    }, [])

    if (isUserAuthorized === "unknown") {
        return (
            <React.StrictMode>
                <HeaderComponent />
                <div className="containerWrapper">
                    <main>
                        <p>Chargement en cours...</p>
                    </main>
                </div>
                <FooterComponent />
            </React.StrictMode>
        )
    }

    else if (isUserAuthorized === false) {
        return (
            <React.StrictMode>
                <HeaderComponent value="notFound" />
                <div className="containerWrapper">
                    <main>
                        <h1>Oups ! Il n'y a pas d'accès à cette page</h1>
                        <p>Cette page a peut être été supprimée ou bien vous n'avez pas les autorisations nécessaires</p>
                    </main>
                </div>
                <FooterComponent />
            </React.StrictMode>
        )
    }
    else if (isUserAuthorized === true) {

        //console.log(currentPost);
        let postTreated = 
        {
            id: currentPost._id,
            textContent: "",
            imageContent: "",
            imageContentAlt: ""

        };
        //console.log(currentPost.content);
        if(currentPost.content.type === "textOnly")
        {  
            postTreated.textContent = currentPost.content.text;
        }
        else if(currentPost.content.type === "imageOnly")
        {  
            postTreated.imageContent = currentPost.content.imageUrl;
            postTreated.imageContentAlt = currentPost.content.imageAlt;
        }
        else
        {
            postTreated.textContent = currentPost.content.text;
            postTreated.imageContent = currentPost.content.imageUrl;
            postTreated.imageContentAlt = currentPost.content.imageAlt;
        }


        return (
            <React.StrictMode>
                <HeaderComponent value="editPostAuth" />
                <div className="containerWrapper">
                    <main>
                        <EditPostComponent post={postTreated}/>
                    </main>
                </div>
                <FooterComponent />
            </React.StrictMode>
        )
    }
}

export default EditPostPage;