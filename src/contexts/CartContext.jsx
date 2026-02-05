import { createContext } from "react";


const cartContext = createContext();

function cartContextProvider({children}){
    const [cartList, setCartList] = useState([]);

    function addOrdine(item){            
        if(cartList.find((elem) => elem.id === item.id) === undefined){
            let newOrder = {
                id_product: item.id,
                quantity: 1,
            };
            
            setCartList([...cartList, newOrder]);
        }else{
            const copyArray = cartList.map((elem) => {
                if(elem.nome === item.nome){
                    const nuovaQuantita =elem.quantita + 1;
                    return {
                        ...elem,
                        quantita: nuovaQuantita,
                    }
                }else{
                    return elem;
                }
            })            
            setCartList(copyArray)
        }
    }

    function removeOrdine(item, indexDelete){
        const copyArray = [...cartList];
        if(copyArray[indexDelete].quantita === 1){
            const newArray = cartList.toSpliced(indexDelete, 1)
            setCartList(newArray);
        }else{
            copyArray[indexDelete].quantita = copyArray[indexDelete].quantita - 1;
            setCartList(copyArray)
        }
    };

    function resetCarrello(){
        setCartList([]);
    }
    
    let totale = 0;
    cartList.forEach(({ quantita, prezzo }) => {
        totale += (quantita * prezzo);
    })

    const valueCarrelloContex = {
        cartList, 
        addOrdine,
        removeOrdine,
        totale,
        resetCarrello,
    }

    const cartValue = {

    }

    return (
        <cartContext value={cartValue}>
            {children}
        </cartContext>
    )
}