import React, { useState } from "react";

const SignUpComponent = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeated, setPasswordRepeated] = useState();
    const [emailValidator, setEmailValidator] = useState();
    const [passwordValidator, setPasswordValidator] = useState();
    const [passwordRepeatedValidator, setPasswordRepeatedValidator] = useState();

    const emailCheckFunction = (e) => {
        let regexTest = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]*$/;
        let result = (regexTest.test(e));
        !result ? setEmailValidator(false) : setEmailValidator(true);
        return result;
    }

    const passwordCheckFunction = (e) => {
        //let regexTest =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        let regexTest = /^(?=.*?[a-z]).{3,}$/;
        let result = (regexTest.test(e));
        !result ? setPasswordValidator(false) : setPasswordValidator(true);
        return result;
    }
    const passwordRepeatedCheckFunction = (e) => {
        !(password === passwordRepeated) ? setPasswordRepeatedValidator(false) : setPasswordRepeatedValidator(true);
    }

    const signUpButton = (e) => {
        e.preventDefault();

        if (emailValidator && passwordValidator && passwordRepeatedValidator) {
            if (password === passwordRepeated) {
                fetch("http://localhost:3050/api/v1/user/signup",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: password, passwordRepeated: passwordRepeated })
                    })
                    .then((response) => {
                        if (response.ok) {
                            alert("Inscription effectuée avec succès!");
                            window.location.href = "../login";
                        }
                        else {
                            alert("Une erreur est survenue");
                        }
                    })
                    .catch(() => alert("Une erreur est survenue"));
            }

            else {
                alert("Mot de passe ne correspondent pas");
            }
        }
        else {
            alert("Veuillez vérifier le formulaire");
        }
    }

    return (
        <React.StrictMode>
            <h1>Inscription</h1>
            <p>Vous pouvez vous inscrire ici au réseau interne de Groupomania!</p>
            <form onSubmit={signUpButton} className="login_signup_box">
                <div className="login_signup_box__field">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" placeholder="john.doe@mail.com" onChange={(e) => setEmail(e.target.value)} onBlur={(e) => emailCheckFunction(e.target.value)}></input>
                    {emailValidator === false ? <p className="login_signup_box__field__error">L'adresse mail entrée est non valide</p> : null}
                </div>
                <div className="login_signup_box__field">
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} onBlur={(e) => passwordCheckFunction(e.target.value)}></input>
                    {passwordValidator === false ? <p className="login_signup_box__field__error">Le mot de passe doit être de longueur 8 et contenir au moins une lettre minuscule, une lettre minuscule et un chiffre </p> : null}
                </div>
                <div className="login_signup_box__field">
                    <label htmlFor="passwordRepeated">Veuillez répéter le mot de passe:</label>
                    <input type="password" name="passwordRepeated" id="passwordRepeated" onChange={(e) => setPasswordRepeated(e.target.value)} onBlur={(e) => passwordRepeatedCheckFunction(e.target.value)}></input>
                    {passwordRepeatedValidator === false ? <p className="login_signup_box__field__error">Les mots de passe ne correspondent pas</p> : null}
                </div>
                <button type="submit" className="login_signup_box__button submit_button">S'inscrire</button>
            </form>
        </React.StrictMode>
    )
}

export default SignUpComponent;