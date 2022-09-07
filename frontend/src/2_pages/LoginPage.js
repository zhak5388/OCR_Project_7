import React, {useContext, useEffect} from "react";
import { AuthContext } from "../4_utils/AuthContext";
import FooterComponent from "../1_Components/FooterComponent";
import HeaderComponent from "../1_Components/HeaderComponent";
import LoginComponent from "../1_Components/LoginComponent";

const LoginPage = () =>
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
            <div>
                <main>
                    <LoginComponent>
                    {document.title="Groupomania - Connection"}
                    </LoginComponent>
                </main>
            </div>
            <FooterComponent/>
        </React.StrictMode>
    );
}

export default LoginPage;