import React from "react";

const NotFoundComponent = () =>
{
    return(
        <React.StrictMode>
            <h1>404 - Oups ! Cette page n'existe pas.</h1>
            <p>La page que vous recherchez n'existe pas, l'adresse entrée est peut-être incorrecte ou elle a peut être été déplacée</p>
        </React.StrictMode>
    )
}

export default NotFoundComponent;