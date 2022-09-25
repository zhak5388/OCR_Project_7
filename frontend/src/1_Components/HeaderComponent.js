import areTokenAvailable from "../4_utils/tokenChecker";
import logo from "../5_misc/groupomania_logo_complet.png"

const HeaderComponent = (props) => {
    const logout = (e) => {
        e.preventDefault();

        localStorage.removeItem("groupomania_id");
        localStorage.removeItem("groupomania_token");
        window.location.href = "../login";
    }

    /* Suppression de l'option profil
    const goToProfile = (e) => //En cours
    {
        e.preventDefault();

        let userId = localStorage.getItem("groupomania_id");
        window.location.href = `../profile/${userId}`;
    }
    */
   //Cas 1 - Pour Page Home
   //Suppression de l'option profil
   //<li><span onClick={(e) => goToProfile(e)}>Profil</span></li>
    if (props.value === "home")
    {
        return (
            <header>
                <div className="contentWrapper">
                    <div className="logo">
                        <img src={logo} alt="Groupomania" />
                    </div>
                    <nav>
                        <ul>
                            <li><span onClick={(e) => logout(e)}>Se déconnecter</span></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
    else if (props.value === "profile") //Cas 2 - Pour Page Profil
    {
        return (
            <header>
                <div className="contentWrapper">
                    <div className="logo">
                        <img src={logo} alt="Groupomania" />
                    </div>
                    <nav>
                        <ul>
                            <li><a href="../home">Acceuil</a></li>
                            <li><span onClick={(e) => logout(e)}>Se déconnecter</span></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
    else if (props.value === "notFound")//Cas 3 - Pour Page 404
    {
        let redirect = "../login";
        if(areTokenAvailable())
        {
            redirect = "../home";
        }
        return (
            <header>
                <div className="contentWrapper">
                    <div className="logo">
                        <img src={logo} alt="Groupomania" />
                    </div>
                    <nav>
                        <ul>
                            <li><a href={redirect}>Acceuil</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
    else if (props.value === "editPostAuth") //Cas 4 - Pour Edit Post
    {
        return (
            <header>
                <div className="contentWrapper">
                    <div className="logo">
                        <img src={logo} alt="Groupomania" />
                    </div>
                    <nav>
                        <ul>
                            <li><a href="../home">Acceuil</a></li>
                            <li><span onClick={(e) => logout(e)}>Se déconnecter</span></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
    else return ( //Cas 5 (Defaut) - Pour Page Login & SignUp
        <header>
            <div className="contentWrapper">
                <div className="logo">
                    <img src={logo} alt="Groupomania" />
                </div>
                <nav>
                    <ul>
                        <li><a href="../login">Se connecter</a></li>
                        <li><a href="../signup">S'inscrire</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderComponent;