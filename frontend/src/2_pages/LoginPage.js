import React, { useEffect, useState } from "react";
import FooterComponent from "../1_Components/FooterComponent";
import LoginComponent from "../1_Components/LoginComponent";
import HeaderComponent from "../1_Components/HeaderComponent";
import areTokenAvailable from "../4_utils/tokenChecker";
import { ReloadProvider } from "../1_Components/ReloadComponent";

const LoginPage = () => {
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
            <ReloadProvider>
                <HeaderComponent />
                <div className="containerWrapper">
                    <main>
                        {(tokenState === false) ?
                            <LoginComponent>
                                {document.title = "Groupomania - Connection"}
                            </LoginComponent> : <p>Chargement en cours...</p>
                        }
                    </main>
                </div>
                <FooterComponent />
            </ReloadProvider>
        </React.StrictMode>
    )

}

export default LoginPage;