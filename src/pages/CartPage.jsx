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
    const { cartList, addProduct, updateQuantity, removeProduct, calcTotal, showPreview, setShowPreview } = useCart();
    if (setShowPreview) {
        setShowPreview(false);
    }
    return (
        <>
            <main className={style.main}>
                {cartList.length === 0 ?
                    <div className={style.emptyCart}>
                        <h1>IL TUO CARRELLO È VUOTO</h1>
                        <Link to={"/prodotti"} className={style.checkOut}>VAI ALLO SHOPPING</Link>
                    </div>
                    :
                    <section className={style.sectionCart}>
                        <div className={style.sectionProduct}>
                            {cartList.map((product, index) => (
                                <div key={product.slug} className={style.card}>
                                    <img src={product.image} alt="" />
                                    <div className={style.bodyCard}>
                                        <Link to={`/productdetails/${product.slug}`} className={style.description}>
                                            <h2>{product.name}</h2>
                                        </Link>
                                        {/*  <span className={style.quantityPrice}>
                                                <div className={style.quantityContainer}>
                                                <span>quantita</span>
                                                    <button onClick={() =>  updateQuantity(index, product.quantity - 1)}>-</button>
                                                    
                                                    <input
                                                        type="number"
                                                        value={product.quantity}
                                                        min={1}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            if (!isNaN(value)) updateQuantity(index, value);
                                                        }}
                                                        onClick={(e) => e.stopPropagation}
                                                    />
                                                    <button onClick={() => updateQuantity(index, product.quantity + 1)}>+</button>
                                                </div>
                                                <h3>Price: {(product.price * product.quantity).toFixed(2)}€</h3>
                                            </span>
                                        
                                        <a onClick={() => removeProduct(index)}>RIMUOVI</a> */}

                                        <div className={style.productDetails}>
                                            <div className={style.quantityContainer}>
                                                <span>Quantità:</span>
                                                <button onClick={() => updateQuantity(index, product.quantity - 1)}>-</button>
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    min={1}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value)) updateQuantity(index, value);
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <button onClick={() => updateQuantity(index, product.quantity + 1)}>+</button>
                                            </div>

                                            <h3 className={style.price}>Prezzo: {(product.price * product.quantity).toFixed(2)}€</h3>
                                            <button className={style.removeButton} onClick={() => removeProduct(index)}>RIMUOVI</button>
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
                            <button className={style.checkOut}>CHECKOUT</button>
                        </div>
                    </section>
                }

            </main>
        </>
    )
}