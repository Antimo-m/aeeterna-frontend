import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import style from "../styles/ProductDetails.module.css"
import { useCart } from "../contexts/CartContext";
import { useLoad } from "../contexts/LoadContext";
import { useWishList } from "../contexts/WishListContext";
import CardProduct from "../components/CardProducts";


export default function ProductDetails() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])
    const { addCart } = useCart();
    const { slug } = useParams();
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [product, setProduct] = useState({})
    const [relatedProducts, setrelatedProducts] = useState([])
    const [indexImage, setIndexImage] = useState(0)
    const [pageLoad, setPageLoad] = useState(false);
    const { Load, setLoad } = useLoad();
    setLoad(false)

    const { wishList, inWishList, addWishList, removeWishList } = useWishList();

    useEffect(() => {
        setPageLoad(false)
        axios.get(`${backEndUrl}/api/product/${slug}`).then((resp) => {
            setProduct(resp.data)
            console.log(resp.data);

            axios.get(`${backEndUrl}/api/product?category=0&skinType=${resp.data.id_skin_type}&limit=80&offset=0&minPrice=0&maxPrice=9999`).then((respRelated) => {
                setrelatedProducts(respRelated.data)
                console.log(respRelated.data);
                setPageLoad(true)

            }).catch((err) => {
                console.log(err);
            }).finally(() => {
            })

        }).catch((err) => {
            console.log(err);
            setPageLoad(true)
        })
    }, [])

    return (
        <>
            <main className={style.main}>
                {pageLoad &&
                    <>
                        <section className={style.sectionProduct}>
                            <div className={style.name}>
                                <h1>{product.name}</h1>
                                <span>
                                    <h2>Tipo di pelle</h2>
                                    <h5>{product.skin_type}</h5>
                                </span>
                            </div>
                            <div className={style.img}>
                                <img src={product.images[indexImage].path} alt="" />
                            </div>
                            <div className={style.description}>
                                <div className={style.sectionPrice}>
                                    <h3>{parseFloat(product.price).toFixed(2)}€</h3>
                                    <div>
                                        <button className="addCartHover" onClick={() => addCart(product)}>Aggiungi al carrelo</button>
                                        <button className={inWishList(product) ? "btninWish" : "btnWish"} onClick={() => { inWishList(product) ? removeWishList(product) : addWishList(product) }}>
                                            <i className="bi bi-heart"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className={style.sectionDescription}>
                                    <div>
                                        <h2>Descrizione</h2>
                                        <h4>{product.description}</h4>
                                    </div>
                                    <div>
                                        <h2>Ingredienti</h2>
                                        {product.ingredients.map((ingredient) => (
                                            <h4 key={ingredient.id}>{ingredient.name}</h4>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={style.relatedSection}>
                            <h2>Potrebbero piacerti</h2>
                            <div className={style.relatedProduct}>
                                {relatedProducts.map((product, index) => (
                                    <CardProduct key={index}
                                        product={product} />
                                ))}
                            </div>
                        </section>

                    </>
                }
            </main>
        </>
    )
}