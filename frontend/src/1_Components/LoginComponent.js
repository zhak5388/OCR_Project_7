import React, { useState } from "react";


const LoginComponent = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoginPassCorrect, setLoginState] = useState();

    const loginButton = (e) => {
        e.preventDefault();

        fetch("http://localhost:3050/api/v1/user/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            })
            .then((response) => {
                if (response.ok) {
                    setLoginState(true);
                    return response.json();
                }
                else {
                    setLoginState(false);
                    return false;
                }
            })
            .then((data) => {
                if (data !== false) {
                    localStorage.setItem("groupomania_token", data.token);
                    localStorage.setItem("groupomania_id", data.userId);
                    window.location.href = "../home";
                }
            })
            .catch(() => alert("Une erreur est survenue"));


    }

    return (
        <React.StrictMode>
            <h1>Connexion</h1>
            <p>Vous pouvez vous connecter ici au réseau interne de Groupomania!</p>
            <form onSubmit={loginButton} className="login_signup_box">
                <div className="login_signup_box__field">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" placeholder="john.doe@mail.com" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="login_signup_box__field">
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    {isLoginPassCorrect === false ? <p className="login_signup_box__field__error--login">La combinaison que vous avez entrée est incorrecte</p> : null}
                </div>
                <button type="submit" className="login_signup_box__button submit_button">Se connecter</button>
            </form>
        </React.StrictMode>
    )
}

export default LoginComponent;