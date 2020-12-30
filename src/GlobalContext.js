import React, {createContext, useState} from 'react'
export const  GlobalContext = createContext();
export const GlobalProvider = props =>{
    const [global, setGlobal] = useState({
        address: 'Islamabad pakistan'
    });
    return <GlobalContext.Provider value={[global, setGlobal]}>
            {props.children}
        </GlobalContext.Provider>;
}
