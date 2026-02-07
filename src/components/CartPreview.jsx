import { useCart } from "../contexts/CartContext";
import styles from "../styles/CartPreview.module.css"
import { useNavigate } from "react-router-dom";

export default function CartPreview() {
    const { cartList, showPreview, setShowPreview } = useCart();
    const navigate = useNavigate();

    function handleGoToCart() {
        setShowPreview(false);
        navigate("/cart")
    };

    if (!showPreview) return null;

    return (
        <div className={`${styles.cartPreview} ${showPreview ? styles.show : ''}`}>
            <div className={styles.cartPreviewHeader}>
                <h3>Carrello ({cartList.length})</h3>
                <button onClick={() => setShowPreview(false)}>✕</button>
            </div>

            <div className={styles.cartPreviewBody}>
                {cartList.length === 0 ? (
                    <p>Il carrello è vuoto</p>
                ) : (
                    cartList.map((product, index) => (
                        <div key={index} className={styles.cartPreviewItem}>
                            <img src={product.image} alt={product.name} />
                            <div className={styles.cartPreviewInfo}>
                                <p>{product.name}</p>
                                <p>Quantità: {product.quantity}</p>
                                <p>€{product.price}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.cartPreviewFooter}>
                <button
                    className={styles.goToCartButton}
                    onClick={handleGoToCart}
                >
                    Vai al Carrello
                </button>
            </div>
        </div>

    );
}
