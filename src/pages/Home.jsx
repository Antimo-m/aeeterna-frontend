import axios from "axios";
import { useEffect, useState } from "react";
import MainStyle from "../styles/Main.module.css";
import styles from "../styles/HeroBunner.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useLoad } from "../contexts/LoadContext";
import { useWishList } from "../contexts/WishListContext"

// Import Immagini locali
import missionImg from "../assets/images/mission.png";
import ingredientsImg from "../assets/images/ingredienti.png";




export default function Home() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const { addCart } = useCart();
    const { setLoad } = useLoad();
    const { wishList, addWishList, inWishList, removeWishList } = useWishList();

    useEffect(() => {
        Promise.all([
            axios.get(`${backEndUrl}/api/product/bestseller`),
            axios.get(`${backEndUrl}/api/product/newarrivals`)
        ]).then(([respBestseller, respNewArrivals]) => {
            console.log(respBestseller.data);

            setProducts(respBestseller.data);
            setNewProducts(respNewArrivals.data);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoad(false)
        });
    }, [backEndUrl]);



    return (
        <>
            {/*  Section HeroBunner */}
            <section className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Bellezza senza tempo</h1>
                    <p className={styles.subtitle}>
                        Cura la tua pelle oggi per la bellezza del domani.
                    </p>
                    <button className={styles.button}>
                        SCOPRI DI PIÙ
                    </button>
                </div>
            </section>


            {/*  Section Popolare e di tendenza */}
            <section className={MainStyle.section}>
                <h2 className={MainStyle.sectionTitle}>Popolare e di Tendenza</h2>
                <div className={MainStyle.productGrid}>

                    {products.length > 0 && products.map((product) => (
                        <div key={product.id} className={MainStyle.productCard}>
                            <Link to={`/productdetails/${product.slug}`} className={MainStyle.imageContainer}>
                                <img src={product.image} alt={product.name} />
                            </Link>

                            <Link to={`/productdetails/${product.slug}`} className={MainStyle.productName}>{product.name}</Link>
                            <span className={MainStyle.price}>{product.price} €</span>

                            <div className={MainStyle.buttonGroup}>
                                <button onClick={() => addCart(product)} className={`addCartHover ${MainStyle.button}`}>AGGIUNGI AL CARRELLO</button>
                                <button className={inWishList(product) ? "btninWish" : "btnWish"} onClick={() => { inWishList(product) ? removeWishList(product) : addWishList(product) }}>
                                    <i className="bi bi-heart"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/*  MISSION */}
            <section className={MainStyle.mission}>
                <div className={MainStyle.missionText}>
                    <h2>LA NOSTRA <strong>MISSION</strong></h2>
                    <p>
                        Aeterna Skin nasce da una convinzione semplice ma profonda:
                        prendersi cura della propria pelle significa prendersi cura di sé.
                    </p>
                    <p>
                        Il nostro obiettivo non è offrire soluzioni miracolose,
                        ma accompagnare ogni persona nel tempo.
                    </p>
                </div>

                <div className={MainStyle.missionImage}>
                    <img src={missionImg} />
                </div>
            </section>

            {/* NUOVI PRODOTTI  */}
            <section className={MainStyle.section}>
                <h2 className={MainStyle.sectionTitle}>
                    Nuovi prodotti che Amerai
                </h2>

                <div className={MainStyle.productGrid}>
                    {newProducts.length > 0 &&
                        newProducts.map((product) => (
                            <div key={product.id} className={MainStyle.productCard}>
                                <Link to={`/productdetails/${product.slug}`} className={MainStyle.imageContainer}>
                                    <span className={MainStyle.badge}>NOVITÀ</span>
                                    <img src={product.image} alt={product.name} />
                                </Link>

                                <Link to={`/productdetails/${product.slug}`} className={MainStyle.productName}>{product.name}</Link>
                                <span className={MainStyle.price}>{product.price} €</span>

                                <div className={MainStyle.buttonGroup}>
                                    <button onClick={() => addCart(product)} className={`addCartHover ${MainStyle.button}`}>AGGIUNGI AL CARRELLO</button>
                                    <button className={inWishList(product) ? "btninWish" : "btnWish"} onClick={() => { inWishList(product) ? removeWishList(product) : addWishList(product) }}>
                                        <i className="bi bi-heart"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </section >


            {/* INGREDIENTI  */}
            < section className={MainStyle.ingredients} >
                <div className={MainStyle.ingredientsImage}>
                    <img src={ingredientsImg} />
                </div>

                <div className={MainStyle.ingredientsText}>
                    <h2>I NOSTRI <strong>INGREDIENTI</strong></h2>
                    <p>
                        In un mercato saturo di promesse rapide,
                        noi scegliamo la consapevolezza e la scienza.
                    </p>
                    <p>
                        Ogni prodotto è pensato come uno strumento educativo
                        per risultati reali e duraturi.
                    </p>
                </div>
            </section >
        </>
    )
}