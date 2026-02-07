import { createContext, useState, useContext, useEffect} from "react";

const WishListContext = createContext();

function WishListContextProvider({ children }) {

    const [wishList, setWishList] = useState(() => {
        const savedWish = localStorage.getItem("wishlist");
        return savedWish ? JSON.parse(savedWish) : [];
    });


    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);

    function inWishList(product) {
        return wishList.find((item) => item.slug === product.slug) !== undefined;
    }

    function addWishList(product) {    
        // setWishList([...wishList, product]);
        if (!inWishList(product)) {
            setWishList(prev => [...prev, product]);
        }
    }

    function removeWishList(product){
        const indexDelete = wishList.findIndex((item) => item.slug === product.slug);
        const newWishList = wishList.toSpliced(indexDelete, 1);
        setWishList(newWishList);
    }

    const wishListValue = {
        wishList,
        setWishList,
        inWishList,
        addWishList,
        removeWishList
    }
    return (
        <WishListContext.Provider value={wishListValue}>
            {children}
        </WishListContext.Provider>
    )
}

function useWishList(){
    const value  = useContext(WishListContext)
    return value
}

export {useWishList, WishListContextProvider}