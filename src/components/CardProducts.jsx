import MainStyle from "../styles/Main.module.css";
import { useWishList } from "../contexts/WishListContext";
import { useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom";

export default function CardProduct({ product }) {

    const { addCart } = useCart();
    const { removeWishList, addWishList, inWishList } = useWishList();
    return (
        <>
            <div className={MainStyle.productCard}>
                <Link to={`/productdetails/${product.slug}`} className={MainStyle.imageContainer}>
                    <img src={product.image} alt={product.name} />
                </Link>

                <Link to={`/productdetails/${product.slug}`} className={MainStyle.productName}>{product.name}</Link>
                <span className={MainStyle.price}>
                    {parseFloat(product.price).toFixed(2)}€
                </span>

                <div className={MainStyle.buttonGroup}>
                    <button onClick={() => addCart(product)} className={`addCartHover ${MainStyle.button}`}>AGGIUNGI AL CARRELLO</button>
                    <button className={inWishList(product) ? "btninWish" : "btnWish"} onClick={() => { inWishList(product) ? removeWishList(product) : addWishList(product) }}>
                        <i className="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </>
    )
}