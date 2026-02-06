import { useWishList } from "../contexts/WishListContext"
import { useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom"
import { useLoad } from "../contexts/LoadContext"
import { useEffect } from "react";
import style from "../styles/WishList.module.css"


export default function WishList() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])
    const { wishList, removeWishList } = useWishList();
    const { addCart } = useCart();
    const { setLoad } = useLoad();
    setLoad(false)
    return (
        <main className={style.main}>

            {wishList.length === 0 ?
                <div className={style.emptyWish}>
                    <h2>LA TUA WISHLIST È VUOTA</h2>
                    <Link to={"/search"} className={style.goShop}>VAI ALLO SHOPPING</Link>
                </div>
                :
                <>
                    <h1>La tua Wishlist</h1>
                    <h3>I tuoi prodotti preferiti in un click</h3>
                    <div className={style.container}>
                        {wishList.map((product, index) => (
                            <div key={index} className={style.card}>
                                <Link to={`/product/${product.slug}`}>
                                    <img src={product.image} alt="" />

                                    <h2>{product.name}</h2>
                                    <h3>{product.price}€</h3>
                                </Link>
                                <div className={style.divButton}>
                                    <button onClick={() => addCart(product)} className={`addCartHover ${style.addCart}`}>AGGIUNGI AL CARRELLO</button>
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