import React, { useEffect, useState } from "react";
import SignUpComponent from "../1_Components/SignUpComponent";
import FooterComponent from "../1_Components/FooterComponent";
import HeaderComponent from "../1_Components/HeaderComponent";
import areTokenAvailable from "../4_utils/tokenChecker";


const SignUpPage = () => {
    const [tokenState, setTokenState] = useState(true);
    useEffect(() => {
        if (areTokenAvailable() === true) {
            window.location.href = "../home";
        }
        else {
            setTokenState(false);
        }
    }, []);

    return (
        <React.StrictMode>
            <HeaderComponent />
            <div className="containerWrapper">
                <main>
                    {(tokenState === false) ?
                        <SignUpComponent>
                            {document.title = "Groupomania - Inscription"}
                        </SignUpComponent> : <p>Chargement en cours...</p>}
                </main>
            </div>
            <FooterComponent />
        </React.StrictMode>
    );
}

export default SignUpPage;