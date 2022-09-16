//Il semble que l'on doive utiliser "props"
//La clé doit être unique à la collection locale
//props.value car value est définie dans SignUpPage.js
import logo from "../5_misc/groupomania_logo_complet.png"

const HeaderComponent = (props) => 
{
    return (
        <header>
            <div className="contentWrapper">
                <div className="logo">
                    <img src={logo} alt="Groupomania" />
                </div>
                <nav>
                    <ul>{props.value.map((navElement, index) =>
                    (
                        <li key={`navElement_${index}`}><a href={navElement.link}>{navElement.text}</a></li>
                    ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderComponent;