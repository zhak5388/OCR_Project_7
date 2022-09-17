import React, { useEffect, useState } from "react";
import FooterComponent from "../1_Components/FooterComponent";

import PostMakerComponent from "../1_Components/PostMakerComponent";
import AllPostComponent from "../1_Components/AllPostComponent";
import HeaderComponent from "../1_Components/HeaderComponent";
import areTokenAvailable from "../4_utils/tokenChecker";
const HomePage = () => {

    const [tokenState, setTokenState] = useState();
    useEffect(() => {
        if (areTokenAvailable() === true) {
            setTokenState(true);
        }
        else {
            setTokenState(false);
        }
    }, [])

    if (tokenState === false) {
        return (
            <React.StrictMode>
                <HeaderComponent />
                <div className="containerWrapper">
                    <main>
                        <p>Pour accéder à cette page, vous devez vous <a href="../login">authentifier</a></p>
                    </main>
                </div>
                <FooterComponent />
            </React.StrictMode>)
    }
    else if (tokenState === true)
        return (
            <React.StrictMode>
                <HeaderComponent value="home" />
                <div className="containerWrapper">
                    <main className="main--home-auth">
                        <PostMakerComponent>
                            {document.title = "Groupomania - Acceuil"}
                        </PostMakerComponent>
                        <AllPostComponent />
                    </main>
                </div>
                <FooterComponent />
            </React.StrictMode>
        );
}

export default HomePage;