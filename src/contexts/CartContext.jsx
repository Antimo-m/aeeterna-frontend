import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();

function CartContextProvider({ children }) {

    const [cartList, setCartList] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [showPreview, setShowPreview] = useState(false);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartList));
    }, [cartList]);

    function addCart(newProduct) {
        setCartList(prev => {
            const found = prev.find(product => product.slug === newProduct.slug);

            //controlla se prodotto non presente nel carello per evitare duplicazioni
            if (!found) {
                return [
                    ...prev,
                    {
                        ...newProduct,
                        quantity: newProduct.quantity ?? 1
                    }
                ];
            }

            // se il prodotto ESISTE già
            return prev.map(product =>
                product.slug === newProduct.slug
                    ? {
                        ...product,
                        quantity: product.quantity + (newProduct.quantity ?? 1)
                    }
                    : product
            );
        });
        setShowPreview(true);
      
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


    function updateQuantity(index, newQuantity) {
        if (newQuantity < 1) return; // non permettere quantità < 1
        setCartList(prev => {
            const updated = [...prev];
            updated[index].quantity = newQuantity;
            return updated;
        });
    }


    const cartValue = {
        cartList,
        addCart,
        removeProduct,
        calcTotal,
        resetCarrello,
        updateQuantity,
        showPreview,
        setShowPreview,
    }

    return (
        <CartContext.Provider value={cartValue}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const value = useContext(CartContext);
    return value
}

export { useCart, CartContextProvider }