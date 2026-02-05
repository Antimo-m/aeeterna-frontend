import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import style from "../styles/ProductDetails.module.css"

export default function ProductDetails() {
    const { slug } = useParams();
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [product, setProduct] = useState({})
    const [relatedProducts, setrelatedProducts] = useState([])
    const [load, setLoad] = useState(false)
    const [indexImage, setIndexImage] = useState(0)

    useEffect(() => {
        setLoad(false)
        axios.get(`${backEndUrl}/api/product/${slug}`).then((resp) => {
            setProduct(resp.data)
            console.log(resp.data);

            axios.get(`${backEndUrl}/api/product?category=0&skinType=${resp.data.id_skin_type}&limit=10&offset=0&minPrice=0&maxPrice=9999`).then((respRelated) => {
                setrelatedProducts(respRelated.data.result)
                console.log(respRelated.data.result);
                
            }).catch((err) => {

            })

            setLoad(true)
        }).catch((err) => {

        })
    }, [])

    return (
        <>
            <main className={style.main}>
                {load &&
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
                                <img src={`${backEndUrl}/image/${product.image[indexImage].path}`} alt="" />
                            </div>
                            <div className={style.description}>
                                <div className={style.sectionPrice}>
                                    <h3>{product.price}€</h3>
                                    <div>
                                        <button>Aggiungi al carrelo</button>
                                        <button><i className="bi bi-heart"></i></button>
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
                                    <div key={index}>
                                        <img src={`${backEndUrl}/image/${product.image}`} alt={product.name} />
                                        <div>
                                            <h2>{product.name}</h2>
                                            <h3>{product.price}€</h3>
                                            <div className={style.button}>
                                                <button className={style.addCart}>Aggiungi al carrello</button>
                                                <button className={style.addWishList}><i className="bi bi-heart"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section></section>
                    </>
                }
            </main>
        </>
    )
}