import { Link, } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import style from "../styles/CartPage.module.css"
import { useEffect } from "react";


export default function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    let totalProduct = 0;

    const { cartList, addProduct, updateQuantity, removeProduct, calcTotal, resetCarrello, removeAllQuantity } = useCart();

    cartList.forEach((product) => {
        totalProduct += product.quantity;
    })

    return (
        <>
            <main className={style.main}>
                {cartList.length === 0 ?
                    <div className={style.emptyCart}>
                        <h1>IL TUO CARRELLO È VUOTO</h1>
                        <Link to={"/prodotti"} className={style.checkOut}>VAI ALLO SHOPPING</Link>
                    </div>
                    :
                    <>
                        <div className={style.totalProduct}>
                            <Link to={"/prodotti"} className={style.checkOut}>TORNA AI PRODOTTI</Link>
                            <h2>Prodotti nel carrello: {totalProduct}</h2>
                            <button onClick={resetCarrello} className={style.btnDeleteAll}>
                                <span>Svuota carrello <i className="bi bi-trash3"></i></span>
                            </button>
                        </div>
                        <section className={style.sectionCart}>
                            <div className={style.sectionProduct}>
                                <div className={style.sectionDeleteAllProducts}>

                                </div>
                                {cartList.map((product, index) => (
                                    <div key={product.slug} className={style.card}>
                                        <img src={product.image} alt="" />
                                        <div className={style.bodyCard}>
                                            <Link to={`/productdetails/${product.slug}`} className={style.description}>
                                                <h2>{product.name}</h2>
                                            </Link>
                                            <div className={style.productDetails}>
                                                <div className={style.quantityContainer}>
                                                    <span>Quantità:</span>
                                                    <div className={style.buttonQuantity}>
                                                        <button onClick={() => updateQuantity(index, product.quantity - 1)}>-</button>
                                                        <span>{product.quantity}</span>
                                                        <button onClick={() => updateQuantity(index, product.quantity + 1)}>+</button>
                                                    </div>
                                                </div>
                                                <h3 className={style.price}>Prezzo: {(product.price * product.quantity).toFixed(2)}€</h3>
                                                <button className={style.removeButton} onClick={() => removeAllQuantity(index)}>RIMUOVI</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={style.sectionSummary}>
                                <h2>TOTALE ORDINE</h2>
                                <div className={style.tableSummary}>
                                    <div className={style.card}>
                                        <h3>SubTotal</h3>
                                        <h3>{calcTotal(cartList).toFixed(2)}€</h3>
                                    </div>
                                    <div className={style.card}>
                                        {calcTotal(cartList) < 45 ?
                                            <>
                                                <h3>Costi Di Spedizione</h3>
                                                <h3>4.99€</h3>
                                            </>

                                            :
                                            <>
                                                <h3>Costi Di Spedizione</h3>
                                                <div className={style.shippingContainer}>
                                                    <h3 className={style.oldPrice}>4.99€</h3>
                                                    <h3>0.00€</h3>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className={style.card}>
                                        {calcTotal(cartList) < 45 ?
                                            <>
                                                <h3>Totale</h3>
                                                <h3>{(calcTotal(cartList) + 4.99).toFixed(2)}€</h3>
                                            </>

                                            :
                                            <>
                                                <h3>Totale</h3>
                                                <h3>{parseFloat(calcTotal(cartList)).toFixed(2)}€</h3>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className={style.divCheckout}>
                                    <Link to={"/checkout"} className={style.checkOut}>CHECKOUT</Link>
                                </div>
                            </div>
                        </section>
                    </>
                }

            </main>
        </>
    )
}