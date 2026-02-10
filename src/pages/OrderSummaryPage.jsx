import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/OrderSummaryPage.module.css"

export default function OrderSummaryPage() {
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('lastOrder');
        if (!data) {
            navigate('/prodotti');
            return;
        }
        setOrderData(JSON.parse(data));
    }, [navigate]);

    if (!orderData) return null;

    return (
        <>
            <div className={style.title}>
                <div className={style.iconSuccess}>
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <h1>ORDINE CONFERMATO!</h1>
                <p>Grazie per il tuo acquisto</p>
            </div>

            <section className={style.summaryContainer}>

                <div className={style.contentWrapper}>
                    <div className={style.productsSection}>
                        <h2>I Tuoi Prodotti</h2>
                        <div className={style.productsList}>
                            {orderData.items.map((product, index) => (
                                <div key={index} className={style.card}>
                                    <img src={product.image} alt={product.name} />
                                    <div className={style.bodyCard}>
                                        <h2>{product.name}</h2>
                                        <div className={style.productDetails}>
                                            <span className={style.quantity}>Quantità: {product.quantity}</span>
                                            <h3 className={style.price}>{(product.price * product.quantity).toFixed(2)}€</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={style.shippingInfo}>
                            <h2>Indirizzo di Spedizione</h2>
                            <div className={style.addressCard}>
                                <p><strong>{orderData.name} {orderData.surname}</strong></p>
                                <p>{orderData.street}</p>
                                <p>{orderData.postal_code} {orderData.city}, {orderData.province}</p>
                                <p>{orderData.country}</p>
                                <p className={style.contact}>
                                    <i className="bi bi-envelope"></i> {orderData.email}
                                </p>
                                <p className={style.contact}>
                                    <i className="bi bi-telephone"></i> {orderData.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={style.priceSection}>
                        <h2>Riepilogo Pagamento</h2>
                        <div className={style.tableSummary}>
                            <div className={style.row}>
                                <h3>Subtotale</h3>
                                <h3>{orderData.subtotal.toFixed(2)}€</h3>
                            </div>
                            <div className={style.row}>
                                <h3>Spedizione</h3>
                                {orderData.shipping === 0 ? (
                                    <div className={style.shippingContainer}>
                                        <h3 className={style.oldPrice}>4.99€</h3>
                                        <h3>0.00€</h3>
                                    </div>
                                ) : (
                                    <h3>{orderData.shipping.toFixed(2)}€</h3>
                                )}
                            </div>
                            <div className={`${style.row} ${style.totalRow}`}>
                                <h3>Totale</h3>
                                <h3>{orderData.total.toFixed(2)}€</h3>
                            </div>
                        </div>

                        <div className={style.actionButtons}>
                            <button
                                className={style.btnPrimary}
                                onClick={() => navigate('/prodotti')}
                            >
                                Continua gli Acquisti
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}