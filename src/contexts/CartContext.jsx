import { createContext, useContext, useState } from "react";


const CartContext = createContext();

function CartContextProvider({children}){
    const [cartList, setCartList] = useState([]);

    function addOrdine(newProduct){            
        if(cartList.find((product) => product.slug === newProduct.slug) === undefined){
            let newOrder = {
                ...newProduct,
                quantity: 1
            };
            
            setCartList([...cartList, newOrder]);
        }else{
            const copyArray = cartList.map((product) => {
                if(product.slug === newProduct.slug){
                    const newQuantity = product.quantity + 1;
                    return {
                        ...product,
                        quantity: newQuantity,
                    }
                }else{
                    return product;
                }
            })            
            setCartList(copyArray)
        }
    }

    function removeOrdine(newProduct, indexDelete){
        const copyArray = [...cartList];
        if(copyArray[indexDelete].quantity === 1){
            const newArray = cartList.toSpliced(indexDelete, 1)
            setCartList(newArray);
        }else{
            copyArray[indexDelete].quantity = copyArray[indexDelete].quantity - 1;
            setCartList(copyArray)
        }
    };

    function resetCarrello(){
        setCartList([]);
    }
    
    let total = 0;
    cartList.forEach(({ quantity, price }) => {
        total += (quantity * price);
    })

    const cartValue = {
        cartList, 
        addOrdine,
        removeOrdine,
        total,
        resetCarrello,
    }

    return (
        <CartContext value={cartValue}>
            {children}
        </CartContext>
    )
}

function useCart(){
    const value = useContext(CartContext);
    return value
}

export {useCart, CartContextProvider}