import MainStyle from "../styles/Main.module.css";
import { useWishList } from "../contexts/WishListContext";
import { useCart } from "../contexts/CartContext"
import { Link } from "react-router-dom";
import { useMessage } from "../contexts/MessageContext"

export default function CardProduct({ product }) {

    const { addCart, inCart, updateQuantityDetails, returnQuantity } = useCart();
    const { removeWishList, addWishList, inWishList } = useWishList();

    const { showMessage } = useMessage()

    const HandleAddToCart = () => {
        addCart(product)
        showMessage(`${product.name} è ora nel tuo carrello`)
    }
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
                    {inCart(product.slug) ?
                        <div className={MainStyle.buttonQuantity}>
                            <button className="addCartHover" onClick={() => updateQuantityDetails(product.slug, returnQuantity(product.slug) - 1)}>-</button>
                            <span>{returnQuantity(product.slug)}</span>
                            <button className="addCartHover" onClick={() => updateQuantityDetails(product.slug, returnQuantity(product.slug) + 1)}>+</button>
                        </div>
                        :
                        <button className={`addCartHover ${MainStyle.buttonCart}`} onClick={HandleAddToCart}>Aggiungi al carrello</button>
                    }
                    <button className={inWishList(product) ? "btninWish" : "btnWish"} onClick={() => { inWishList(product) ? removeWishList(product) : addWishList(product) }}>
                        <i className="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </>
    )
}