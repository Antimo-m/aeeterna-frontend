import {createContext, useContext, useState} from "react"


const MessageContext = createContext();

export function MessageProvider({children}){
    const [message, setMessage] = useState("")
    const [visible, setVisible]=  useState(false)

    const showMessage = (text) => {
        console.log("Mostrando messaggio:", text); 
        setMessage(text)
        setVisible(true)


        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }
    console.log("Toast visible:", visible, "Message:", message);
    return (
        <>
         <MessageContext.Provider value={{showMessage}}>
            {children}

                {visible && (
                    <div className={`toast ${visible ? "show" : ""}`}>
                        {message}
                    </div>)}
         </MessageContext.Provider>
        </>
    )
}

export function useMessage() {
    return useContext(MessageContext)
}






