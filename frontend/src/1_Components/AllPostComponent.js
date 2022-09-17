import React, { useState, useEffect, useContext } from "react";
import { removeInvalidToken } from "../4_utils/tokenChecker";
import PostComponent from "./PostComponent";
import { ReloadContext } from "./ReloadComponent";

const AllPostComponent = () => {
    const [allPost, getAllPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [orderPost, setOrderPost] = useState("?orderBy=mostRecent");
    const reload = useContext(ReloadContext);
    useEffect(() => {
        setTimeout(() => {
            const authorizationHeader = new Headers(
                {
                    Authorization: "Bearer " + localStorage.getItem("groupomania_token")
                });

            fetch("http://localhost:3050/api/v1/submission/" + orderPost,
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
                .then((allPostData) => {
                    if (allPostData === false) {
                        alert("Votre session a expirée. Vous allez être redirigé vers la page de connexion");
                        removeInvalidToken();
                        window.location.href = "../login";
                    }
                    else {
                        getAllPosts(allPostData);
                        setIsLoading(false);
                    }

                })
                .catch(() => {
                    alert("Une erreur interne est survenue. Vous allez être redirigé vers la page de connexion");
                    removeInvalidToken();
                    window.location.href = "../login";
                });

        }, 1000)

    }, [orderPost, reload.homePage])

    const orderAllPost = (orderCriteria) => {
        const queryParams = `?orderBy=${orderCriteria}`;
        if (queryParams !== orderPost) {
            setIsLoading(true);
            setOrderPost(queryParams);
        }
    }

    if (isLoading) {
        return <p>Chargement... </p>
    }
    return (
        <React.StrictMode>
            <div>
                <div onClick={() => orderAllPost("newest")}>Plus récent</div>
                <div onClick={() => orderAllPost("oldest")}>Plus ancien</div>
                <div onClick={() => orderAllPost("mostPopular")}>Plus Populaire</div>
                <div onClick={() => orderAllPost("lessPopular")}>Moins Populaire</div>
            </div>
            {allPost.map((data) =>
            (
                <PostComponent postData={data} key={data._id} />
            ))}
        </React.StrictMode>
    )
}

export default AllPostComponent;