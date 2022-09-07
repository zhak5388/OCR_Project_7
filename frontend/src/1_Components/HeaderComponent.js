//Il semble que l'on doive utiliser "props"
//La clé doit être unique à la collection locale
//props.value car value est définie dans SignUpPage.js

const HeaderComponent = (props) =>
{   
    return(
        <header>
            <div>GROUPOMANIA</div>
            <nav>
                <ul>{props.value.map((navElement, index) =>
                    (
                        <li key={`navElement_${index}`}><a href={navElement.link}>{navElement.text}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent;