import React from "react";
import FooterComponent from "../1_Components/FooterComponent";
import NotFoundComponent from "../1_Components/NotFoundComponent";
import HeaderComponent from "../1_Components/HeaderComponent";

const NotFoundPage = () => {
    return (
        <React.StrictMode>
            <HeaderComponent value="notFound" />
            <div className="containerWrapper">
                <main>
                    <NotFoundComponent>
                        {document.title = "Groupomania - 404"}
                    </NotFoundComponent>
                </main>
            </div>
            <FooterComponent />
        </React.StrictMode>
    );
}

export default NotFoundPage;