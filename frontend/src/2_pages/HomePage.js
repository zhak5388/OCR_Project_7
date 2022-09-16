import React, {useContext, useEffect} from "react";
import { AuthContext } from "../4_utils/AuthContext";
import HeaderComponent from "../1_Components/HeaderComponent";
import FooterComponent from "../1_Components/FooterComponent";


import redirectTokenFunction from "../4_utils/redirectFunction";
import PostMakerComponent from "../1_Components/PostMakerComponent";
import AllPostComponent from "../1_Components/AllPostComponent";
import NewHeaderComponent from "../1_Components/NewHeaderComponent";
const HomePage = () =>
{
    redirectTokenFunction("login");
    const { navElement, setNavElement } = useContext(AuthContext);
    useEffect(() =>
    {
        setNavElement([
            {"link":"../profil", "text":"Profil"},
            {"link":"../logout", "text":"Se déconnecter", "special": "disconnect"}
        ]);
        console.log("render nav");
    },[]);
    let stringa = "lol";

    return(
        <React.StrictMode>
            <HeaderComponent value={navElement}/>
            <div className="containerWrapper">
                <main>
                    <PostMakerComponent>
                        {document.title="Groupomania - Acceuil"}
                    </PostMakerComponent>
                    <AllPostComponent/>
                </main>
            </div>
            <FooterComponent/>
        </React.StrictMode>
    );
}

export default HomePage;