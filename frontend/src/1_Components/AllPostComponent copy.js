import React, { useState, useEffect } from "react";
import PostComponent from "./PostComponent";

const AllPostComponent = () =>
{
    const [allPost, getAllPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [orderPost, setOrderPost] = useState("?orderBy=mostRecent");
    const [test, setTest] = useState(0);

    useEffect( () =>
    {
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

    },[orderPost])

    const testLoading = (params) =>
    {
        console.log(params);
        /*
        if(params==1)
        {
            console.log("Cest un 1");
        }
        */
        setTest(test+1);
        console.log(test);
        let a = `?orderBy=${params}`
        setOrderPost(a);
    }

    function orderByFunction(params)
    {
        setIsLoading(true);
        //setTest(test+1);
        setOrderPost("?orderBy=mostRecent");
    }

    if(isLoading)
    {
        return <p>Chargement... </p>
    }
    return(
        <React.StrictMode>
            <div onClick={() => testLoading("mostPopular")}>CLICK</div>
            <div>
                <div onClick={() => setOrderPost("?orderBy=newest")}>Plus récent</div>
                <div onClick={() => setOrderPost("?orderBy=oldest")}>Plus ancien</div>
                <div onClick={() => setOrderPost("?orderBy=mostPopular")}>Plus Populaire</div>
                <div onClick={() => setOrderPost("?orderBy=lessPopular")}>Moins Populaire</div>
            </div>
            <div>Fini!</div>
            {allPost.map( (data) =>
            (
                <PostComponent postData={data} key={data._id}/>
            ))}
        </React.StrictMode>
    )
}

export default AllPostComponent;

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