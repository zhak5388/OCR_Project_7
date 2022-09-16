import React, {useContext, useEffect} from "react";
import { AuthContext } from "../4_utils/AuthContext";
import HeaderComponent from "../1_Components/HeaderComponent";
import SignUpComponent from "../1_Components/SignUpComponent";
import FooterComponent from "../1_Components/FooterComponent";


const SignUpPage = () =>
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
                    <SignUpComponent>
                        {document.title="Groupomania - Inscription"}
                    </SignUpComponent>
                </main>
            </div>
            <FooterComponent/>
        </React.StrictMode>
    );
}

export default SignUpPage;