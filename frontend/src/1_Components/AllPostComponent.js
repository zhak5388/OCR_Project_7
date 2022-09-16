import React, { useState, useEffect } from "react";
import PostComponent from "./PostComponent";

const AllPostComponent = () => {
    const [allPost, getAllPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [orderPost, setOrderPost] = useState("?orderBy=mostRecent");
    const [test, setTest] = useState(0);

    useEffect(() => 
    {
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
        .then((response) => 
        {
            if (response.ok)
            {
                return response.json();
            }
        })
        .then((allPostData) => 
        {
            getAllPosts(allPostData);
            //console.log(allPost);
            setIsLoading(false);
        })
        .catch(() => alert("Une erreur interne est survenue"));

        }, 1000)
        /*
        const authorizationHeader = new Headers(
        {
            Authorization: "Bearer " + localStorage.getItem("groupomania_token")
        });

        fetch("http://localhost:3050/api/v1/submission/"+orderPost,
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
        .then((allPostData) =>
        {
            getAllPosts(allPostData);
            console.log(allPost);
            setIsLoading(false);
        })
        .catch( () => alert("Une erreur interne est survenue"));
        */
    }, [orderPost])

    const orderAllPost = (orderCriteria) => 
    {
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
            <div>Fini!</div>
            {allPost.map((data) =>
            (
                <PostComponent postData={data} key={data._id} />
            ))}
        </React.StrictMode>
    )
}

export default AllPostComponent;
/*
single
<PostComponent postData={allPost[0]}/>
All
<div>Fini!</div>
            {allPost.map((data) =>
            (
                <PostComponent postData={data} key={data._id} />
            ))}
*/
/*
working!
<div onClick={() => testLoading("mostPopular")}>CLICK</div>
            <div>
                <div onClick={orderByFunction("mostPopular")}>Plus Populaire</div>
            </div>

            <div>
                <div onClick={setOrderPost("?orderBy=newest")}>Plus récent</div>
                <div onClick={setOrderPost("?orderBy=oldest")}>Plus ancien</div>
                <div onClick={setOrderPost("?orderBy=mostPopular")}>Plus Populaire</div>
                <div onClick={setOrderPost("?orderBy=lessPopular")}>Moins Populaire</div>
            </div>
*/