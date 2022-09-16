import React, {useContext, useEffect} from "react";
import { AuthContext } from "../4_utils/AuthContext";
import HeaderComponent from "../1_Components/HeaderComponent";
import FooterComponent from "../1_Components/FooterComponent";
import NotFoundComponent from "../1_Components/NotFoundComponent";

//Faudra ajouter l'acceuil dans le cas où identifié
const NotFoundPage = () =>
{
    const { navElement, setNavElement } = useContext(AuthContext);
    useEffect(() =>
    {
        setNavElement([
            {"link":"../login", "text":"Se connecter"},
            {"link":"../signup", "text":"S'inscrire"}
        ]);
    },[]);
    return(
        <React.StrictMode>
            <HeaderComponent value={navElement}/>
            <div className="containerWrapper">
                <main>
                    <NotFoundComponent>
                        {document.title="Groupomania - 404"}
                    </NotFoundComponent>
                </main>
            </div>
            <FooterComponent/>
        </React.StrictMode>
    );
}

export default NotFoundPage;