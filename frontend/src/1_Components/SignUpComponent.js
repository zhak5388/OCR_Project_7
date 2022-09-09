import React from "react";

const SignUpComponent = () =>
{
    return(
        <React.StrictMode>
            <h1>Inscription</h1>
            <p>Vous pouvez vous inscrire ici au réseau interne de Groupomania!</p>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="john.doe@mail.com"></input>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password"></input>
                </div>
                <div>
                    <label htmlFor="passwordRepeated">Veuillez répéter le mot de passe</label>
                    <input type="password" name="passwordRepeated" id="passwordRepeated"></input>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </React.StrictMode>
    )
}

export default SignUpComponent;