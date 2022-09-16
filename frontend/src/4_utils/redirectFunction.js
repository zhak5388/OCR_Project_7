const redirectTokenFunction = (pageName) =>
{
    if(!localStorage?.getItem("groupomania_token"))
    {
        window.location.href = `../${pageName}`;
    }
}

export default redirectTokenFunction;