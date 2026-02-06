import { createContext, useState, useContext } from "react";

const LoadContext = createContext();
function LoadContextProvider ({children}){

    const [load, setLoad] = useState(true);
    console.log(load);
    
    
    const loadValue = {
        load,
        setLoad
    }

    return (
        <LoadContext.Provider value={loadValue}>
            {children}
        </LoadContext.Provider>
    )
}

function useLoad(){
 const value = useContext(LoadContext)
 return value
}

export {useLoad, LoadContextProvider}