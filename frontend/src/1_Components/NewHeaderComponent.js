//Il semble que l'on doive utiliser "props"
//La clé doit être unique à la collection locale
//props.value car value est définie dans SignUpPage.js
import logo from "../5_misc/groupomania_logo_complet.png"

const NewHeaderComponent = (testA) => 
{
    const testInjector = (ici) =>
    {
        if(ici==="lol")
        {
            <p>lol</p>
        }
        else if(ici==="haha")
        {
            <p>haha</p>
        }
    }
    console.log(testA.testA);
    if(testA.testA == "lol")
    {
        return <p>lol</p>
    }
    else if(testA.testA == "haha")
    {
        return <p>haha</p>
    }
    else return (
        <header>
            <div className="contentWrapper">
                <div className="logo">
                    <img src={logo} alt="Groupomania" />
                </div>
                <nav>
                    <ul>
                        <li>Test</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NewHeaderComponent;