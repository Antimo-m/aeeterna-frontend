import axios from "axios";
import { useEffect, useState } from "react";
import MainStyle from "../styles/Main.module.css";


// Import Immagini locali
import missionImg from "../assets/images/mission.png";
import ingredientsImg from "../assets/images/ingredienti.png";
import { Link } from "react-router-dom";



export default function Home() {
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);


    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/product/bestseller`)
            .then((resp) => {
                console.log(resp)
                setProducts(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });

        // NUOVI PRODOTTI
        axios
            .get(`http://localhost:3000/api/product/newarrivals`)
            .then((resp) => {
                setNewProducts(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // Configurazione Swiper per coerenza tra le sezioni
    const swiperOptions = {
        modules: [Navigation],
        navigation: true,
        spaceBetween: 25,
        slidesPerView: 1,
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
        }
    };

    return (
        <>
            {/*  Section Popolare e di tendenza */}
            <section className={MainStyle.section}>
                <h2 className={MainStyle.sectionTitle}>Popolare e di Tendenza</h2>
                <div className={MainStyle.productGrid}>

                    {products.length > 0 && products.map((product) => (
                        <div className={MainStyle.productCard}>
                            <Link to={`/productdetails/${product.slug}`} className={MainStyle.imageContainer}>

                                <img src={product.image} alt={product.name} />
                            </Link>

                            <Link to={`/productdetails/${product.slug}`}  className={MainStyle.productName}>{product.name}</Link>
                            <span className={MainStyle.price}>{product.price} €</span>

                            <div className={MainStyle.buttonGroup}>
                                <button className={`addCartHover ${MainStyle.button}`}>AGGIUNGI AL CARRELLO</button>
                                <button className={MainStyle.btnWish}>
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
                            <div  key={product.id} className={MainStyle.productCard}>
                                <Link to={`/productdetails/${product.slug}`} className={MainStyle.imageContainer}>
                                    <span className={MainStyle.badge}>NOVITÀ</span>
                                    <img src={product.image} alt={product.name} />
                                </Link>

                                <Link to={`/productdetails/${product.slug}`}p className={MainStyle.productName}>{product.name}</Link>
                                <span className={MainStyle.price}>{product.price} €</span>

                                <div className={MainStyle.buttonGroup}>
                                    <button className={`addCartHover ${MainStyle.button}`}>AGGIUNGI AL CARRELLO</button>
                                    <button className={MainStyle.btnWish}>
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