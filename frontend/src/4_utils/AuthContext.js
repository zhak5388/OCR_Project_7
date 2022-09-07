import React, { useState, createContext} from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => 
{
    //const [navElement, setNavElement] = useState({"test":"haha"});
    const [navElement, setNavElement] = useState([]);
    
    //console.log("Ici AuthProver")
    //console.log(navElement);
    //console.log(props);
    
    return (
        <AuthContext.Provider value={{ navElement, setNavElement }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;