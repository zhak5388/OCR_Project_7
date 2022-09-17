import React, { useState, useEffect, useContext } from "react";
import { removeInvalidToken } from "../4_utils/tokenChecker";
import PostComponent from "./PostComponent";
import { ReloadContext } from "./ReloadComponent";

const AllPostComponent = () => {
    const [allPost, getAllPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [orderPost, setOrderPost] = useState("?orderBy=newest");
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
                        // eslint-disable-next-line
                        reload.setHomePage(false);
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
            let sortingSelector = document.getElementsByClassName("sorting-post-box__choice");
            for(let i = 0; i < 4; i++)
            {
                sortingSelector[i].className = "sorting-post-box__choice";
            }
        }
    }
    return (
        <React.StrictMode>
            <div className="sorting-post-box">
                <p>Trier par :</p>
                <div
                    id="sorting-post-box-newest"
                    className="sorting-post-box__choice sorting-post-box__choice--selected"
                    onClick={(e) => 
                    {
                        orderAllPost("newest");
                        e.target.className = "sorting-post-box__choice sorting-post-box__choice--selected";
                    }}>Plus récent
                </div>
                <div
                    id="sorting-post-box-oldest"
                    className="sorting-post-box__choice"
                    onClick={(e) => 
                    {
                        orderAllPost("oldest");
                        e.target.className = "sorting-post-box__choice sorting-post-box__choice--selected";
                    }}>Plus ancien
                </div>
                <div
                    id="sorting-post-box-mostPopular"
                    className="sorting-post-box__choice"
                    onClick={(e) => 
                    {
                        orderAllPost("mostPopular");
                        e.target.className = "sorting-post-box__choice sorting-post-box__choice--selected";
                    }}>Plus Populaire
                </div>
                <div
                    id="sorting-post-box-lessPopular"
                    className="sorting-post-box__choice"
                    onClick={(e) => 
                    {
                        orderAllPost("lessPopular");
                        e.target.className = "sorting-post-box__choice sorting-post-box__choice--selected";
                    }}>Moins Populaire
                </div>
            </div>
            {(isLoading === true) ?
            <p>Chargement</p> : allPost.map((data) =>
            (
                <PostComponent postData={data} key={data._id} />
            ))}
        </React.StrictMode>
    )
}

export default AllPostComponent;

//{(optionSelected == "oldest") ? (`className="sorting-post-box__choice--selected"`): null}

/*Bon quetru
            {allPost.map((data) =>
            (
                <PostComponent postData={data} key={data._id} />
            ))}
*/