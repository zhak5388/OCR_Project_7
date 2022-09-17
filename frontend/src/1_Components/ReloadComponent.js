import React, { useState, createContext } from "react";

export const ReloadContext = createContext();

export const ReloadProvider = ({ children }) =>
{
    const [testR, setTestR] = useState("test: Initital");
    const [homePage, setHomePage] = useState(false);

    return (
        <ReloadContext.Provider value={{testR, setTestR, homePage, setHomePage}}>
            {children}
        </ReloadContext.Provider>
    )
}
