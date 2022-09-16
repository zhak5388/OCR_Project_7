import Axios from "axios";

export const test_login = (a,b) =>
{
    Axios.post("http://localhost:3050/api/v1/user/login", {email: a, password: b})
    .then((response) =>
    {
        //console.log(response.data);
        return response.data;
    })
    .catch( (error) => 
    {
        console.log("erreur Axios : "+ error);
    });
}
export const test_fetch = () =>
{
    const myHeaders = new Headers({
        "Content-Type": "application/json"
    });
    
    fetch("http://localhost:3050/api/v1/user/login", 
    {
        method:"POST",
        headers: myHeaders,
        body:JSON.stringify({email: "postman01@mail.com", password: "postman"})
    })
    .then( (response) =>
    {
        //console.log(response.json());
        //return response.json();
        //console.log(response.json());
        if(response.ok)
        {
            console.log("succes?");
            console.log(response.json());
            return response.json();
        }
    })
    .catch( (error) =>
    {
        return error.json()
        //console.log(error);
    })
}

export async function signUpApi()
{
    let a = await fetch("http://localhost:3050/api/v1/user/signup", 
        {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({email: "react01@mail.com", password: "react", passwordRepeated: "react"})
        })
        .then( (response) =>
        {
            if(response.ok)
            {
                console.log("succes?");
                //console.log(response.json());
                return response.json();
            }

            else
            {
                return response.json();
            }
        })
        .catch( (error) =>
        {
            return error.json()
            //console.log(error);
        })
    return a;
}
//export default test_fetch;