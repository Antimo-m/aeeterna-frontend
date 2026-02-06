import { Link, } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import style from "../styles/CartPage.module.css"
import { useLoad } from "../contexts/LoadContext";
import { useEffect } from "react";


export default function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])
    const { cartList, removeProduct, calcTotal } = useCart();
    const { setLoad } = useLoad();
    setLoad(false)

    return (
        <>
            <main className={style.main}>
                {cartList.length === 0 ?
                    <div className={style.emptyCart}>
                        <h1>IL TUO CARRELLO È VUOTO</h1>
                        <Link to={"/search"} className={style.checkOut}>VAI ALLO SHOPPING</Link>
                    </div>
                    :
                    <section className={style.sectionCart}>
                        <div className={style.sectionProduct}>
                            {cartList.map((product, index) => (
                                <div key={product.slug} className={style.card}>
                                    <img src={product.image} alt="" />
                                    <div className={style.bodyCard}>
                                        <Link to={`/product/${product.slug}`} className={style.description}>
                                            <h2>{product.name}</h2>
                                            <span>
                                                <h3>Quantità: {product.quantity}</h3>
                                                <h3>Price: {parseFloat(product.price).toFixed(2)}€</h3>
                                            </span>
                                        </Link>
                                        <a onClick={() => removeProduct(index)}>RIMUOVI</a>
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
                                            <h3>{calcTotal(cartList) + 4.99}</h3>
                                        </>

                                        :
                                        <>
                                            <h3>Totale</h3>
                                            <h3>{parseFloat(calcTotal(cartList)).toFixed(2)}€</h3>
                                        </>
                                    }
                                </div>
                            </div>
                            <button className={style.checkOut}>CHECKOUT</button>
                        </div>
                    </section>
                }

            </main>
        </>
    )
}