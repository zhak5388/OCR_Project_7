const areTokenAvailable = () => {
    const userId = localStorage.getItem("groupomania_id");
    const userToken = localStorage.getItem("groupomania_token");
    if (userId != null && userToken != null) {
        return true;
    }
    else {
        localStorage.removeItem("groupomania_id");
        localStorage.removeItem("groupomania_token");
        return false;
    }
}

export const removeInvalidToken = () =>
{
    localStorage.removeItem("groupomania_id");
    localStorage.removeItem("groupomania_token");
} 

export default areTokenAvailable;