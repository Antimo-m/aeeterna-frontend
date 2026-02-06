import { createContext, useContext, useState } from "react";


const CartContext = createContext();

function CartContextProvider({ children }) {
    const [cartList, setCartList] = useState([]);

    function addCart(newProduct) {
        
        if (cartList.find((product) => product.slug === newProduct.slug) === undefined) {
            let newOrder = {
                ...newProduct,
                quantity: 1
            };
            console.log(cartList);
            console.log(newOrder);
            
            console.log([...cartList, newOrder]);

            setCartList([...cartList, newOrder]);
        } else {
            const copyArray = cartList.map((product) => {
                if (product.slug === newProduct.slug) {
                    const newQuantity = product.quantity + 1;
                    return {
                        ...product,
                        quantity: newQuantity,
                    }
                } else {
                    return product;
                }
            })
            console.log(copyArray);

            setCartList(copyArray)
        }
    }

    function removeProduct(indexDelete) {
        const copyArray = [...cartList];
        if (copyArray[indexDelete].quantity === 1) {
            const newArray = cartList.toSpliced(indexDelete, 1)
            setCartList(newArray);
        } else {
            copyArray[indexDelete].quantity = copyArray[indexDelete].quantity - 1;
            setCartList(copyArray)
        }
    };

    function resetCarrello() {
        setCartList([]);
    }

    function calcTotal(array) {
        let total = 0;
        array.forEach(({ quantity, price }) => {
            total += (quantity * price);
        })
        return total
    }


    const cartValue = {
        cartList,
        addCart,
        removeProduct,
        calcTotal,
        resetCarrello,
    }

    return (
        <CartContext.Provider value={cartValue}>
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const value = useContext(CartContext);
    return value
}

export { useCart, CartContextProvider }