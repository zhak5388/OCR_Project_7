import React from "react";
import { useParams } from "react-router-dom";
import FooterComponent from "../1_Components/FooterComponent";
import HeaderComponent from "../1_Components/HeaderComponent";


const ProfilePage = () => {

    const { userId } = useParams();
    return (
        <React.StrictMode>
            <HeaderComponent value="editPostAuth" />
            <div className="containerWrapper">
                <main>
                    Profil - Placeholder - {userId}
                </main>
            </div>
            <FooterComponent />
        </React.StrictMode>
    )
}

export default ProfilePage;