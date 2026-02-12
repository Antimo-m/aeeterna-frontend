import { useWishList } from "../contexts/WishListContext"
import { useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import style from "../styles/WishList.module.css"


export default function WishList() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])
    const { wishList, removeWishList, resetWishList } = useWishList();
    const { addCart, inCart, updateQuantityDetails, returnQuantity } = useCart();

    return (
        <main className={style.main}>

            {wishList.length === 0 ?
                <div className={style.emptyWish}>
                    <h2>LA TUA WISHLIST È VUOTA</h2>
                    <Link to={"/prodotti"} className={style.goShop}>VAI ALLO SHOPPING</Link>
                </div>
                :
                <>
                    <h1>La tua Wishlist</h1>
                    <h3>I tuoi prodotti preferiti in un click</h3>
                    <div className={style.totalProduct}>
                        <h2>Prodotti nella wishlist: {wishList.length}</h2>
                        <button onClick={resetWishList} className={style.btnDeleteAll}>
                            <span>Svuota wishlist <i className="bi bi-trash3"></i></span>
                        </button>
                    </div>
                    <div className={style.container}>
                        {wishList.map((product, index) => (
                            <div key={index} className={style.card}>
                                <Link to={`/productdetails/${product.slug}`}>
                                    <img src={product.image} alt="" />

                                    <h2>{product.name}</h2>
                                    <h3>{parseFloat(product.price).toFixed(2)}€</h3>
                                </Link>
                                <div className={style.divButton}>
                                    {inCart(product.slug) ?
                                        <div className={style.buttonQuantity}>
                                            <button className="addCartHover" onClick={() => updateQuantityDetails(product.slug, returnQuantity(product.slug) - 1)}>-</button>
                                            <span>{returnQuantity(product.slug)}</span>
                                            <button className="addCartHover" onClick={() => updateQuantityDetails(product.slug, returnQuantity(product.slug) + 1)}>+</button>
                                        </div>
                                        :
                                        <button onClick={() => addCart(product)} className={`addCartHover ${style.addCart}`}>AGGIUNGI AL CARRELLO</button>
                                    }
                                    <button onClick={() => removeWishList(product)} className={style.removeWishList}>
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </main >
    )
}