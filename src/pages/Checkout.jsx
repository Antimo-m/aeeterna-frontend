import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import style from "../styles/Checkout.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";




const backupForm = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    street: "",
    postal_code: "",
    province: "",
    total_price: 0,
    shipping_price: 4.99,
    products: [],
    billing_street: "",
    billing_country: "",
    billing_city: ""
}

export default function Checkout() {
    const [errorMessage, setErrorMessage] = useState({
        type: "",
        message: ""
    })
    const { cartList, calcTotal } = useCart();
    const [dataForm, setDataForm] = useState(backupForm);
    const [checkeboxData, setCheckboxData] = useState(false)
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate()

    useEffect(() => {
        if (errorMessage.type !== "") {
            const timer = setTimeout(() => {
                setErrorMessage({ type: "", message: "" });


                if (errorMessage.type === "correct") {
                    navigate("/prodotti");
                }
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, navigate]);


    function handleForm(event) {
        const { name, value } = event.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    function handleCheckbox(e) {
        setCheckboxData(e.target.checked)
        if (e.target.checked) {
            setDataForm({
                ...dataForm,
                billing_street: dataForm.street,
                billing_country: dataForm.country,
                billing_city: dataForm.city,
            })
        } else {
            setDataForm({
                ...dataForm,
                billing_street: "",
                billing_country: "",
                billing_city: "",
            })
        }
    }

    function submitForm(e) {

        e.preventDefault();
        if (checkeboxData) {
            setDataForm({
                ...dataForm,
                billing_street: dataForm.street,
                billing_country: dataForm.country,
                billing_city: dataForm.city,
            })
        }

        let { name, surname, email, city, country, street, postal_code, province, billing_city, billing_country, billing_street, phone } = dataForm;

        if ((name.length <= 0 || surname.length <= 0 || email.length <= 0 || city.length <= 0 || country.length <= 0 || street.length <= 0 || postal_code.length <= 0 || province.length <= 0 || billing_city.length <= 0 || billing_country.length <= 0 || billing_street.length <= 0 || phone.length <= 0)) {
            setErrorMessage({
                type: "error",
                message: "Aggiungi tutti i campi obbligatori"
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return
        }

        if (name.trim().length < 2 || surname.trim().length < 2) {
            setErrorMessage({
                type: "error",
                message: "Nome e cognome devono contenere almeno 2 caratteri"
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMessage({
                type: "error",
                message: "La mail inserita non è valida"
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return
        }

        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        if (!phoneRegex.test(phone.trim())) {
            setErrorMessage({
                type: "error",
                message: "Il numero di telefono non è valido"
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return
        }

        const postalCodeRegex = /^[A-Z0-9\s\-]{3,10}$/i;
        if (!postalCodeRegex.test(postal_code.trim())) {
            setErrorMessage({
                type: "error",
                message: "Il codice postale non è valido"
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return
        }

        let totalPrice = 0
        cartList.forEach(product => {
            totalPrice += product.price * product.quantity
        });

        let shipping_price = 4.99;
        if (totalPrice >= 45) {
            shipping_price = null;
        } else {
            totalPrice += shipping_price;
        }
        console.log(totalPrice);


        setDataForm({
            ...dataForm,
            shipping_price: shipping_price,
            total_price: totalPrice
        })

        const productsForm = cartList.map((product) => {
            return {
                slug: product.slug,
                quantity: product.quantity,
                price_at_purchase: product.price
            }
        })

        // setDataForm({
        //     ...dataForm,
        //     products: productsForm
        // })

        // console.log({
        //     ...dataForm,
        //     products: productsForm,
        //     total_price: totalPrice
        // });

        // setErrorMessage({
        //     type: "correct",
        //     message: "Ordine inviato con successo"
        // })

        const orderData = {
            name,
            surname,
            email,
            phone,
            city,
            country,
            street,
            postal_code,
            province,
            billing_street: checkeboxData ? street : billing_street,
            billing_city: checkeboxData ? city : billing_city,
            billing_country: checkeboxData ? country : billing_country,
            total_price: totalPrice,
            shipping_price: shipping_price,
            products: productsForm
        }


        try {
            const response = axios.post(`${backEndUrl}/api/neworder`, orderData);

            console.log("✅ Ordine creato:", response.data);
            setErrorMessage({
                type: "correct",
                message: "Ordine inviato con successo!"
            });
        } catch (error) {
            console.error("❌ Errore:", error.response?.data || error.message);
            setErrorMessage({
                type: "error",
                message: error.response?.data?.error || "Errore durante l'invio"
            });
        }
    }

    return (
        <>
            <div className={style.title}>
                <h1>CHECKOUT</h1>
            </div>
            <section className={style.sectionCheckout}>
                {errorMessage.type !== "" &&
                    <div className={errorMessage.type === "error" ? style.errorMessage : style.correctMessage}>
                        {errorMessage.message}
                        <i onClick={() => setErrorMessage({ type: "", message: "" })} className="bi bi-x-lg"></i>
                    </div>
                }

                <div className={style.sectionForm}>
                    <form className={style.shippingForm} onSubmit={(e) => submitForm(e)}>
                        <div className={style.formSection}>
                            <h3 className={style.sectionTitle}>Dati di contatto</h3>
                            <div className={style.formGrid}>
                                <div className={style.formGroup}>
                                    <label htmlFor="name">Nome *</label>
                                    <input id="name" placeholder="Mario" type="text" name="name" value={dataForm.name} onChange={(e) => handleForm(e)} />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="surname">Cognome *</label>
                                    <input id="surname" placeholder="Rossi" type="text" name="surname" value={dataForm.surname} onChange={(e) => handleForm(e)} />
                                </div>
                            </div>
                            <div className={style.formGrid}>
                                <div className={style.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input id="email" placeholder="mario.rossi@email.com" type="email" name="email" value={dataForm.email} onChange={(e) => handleForm(e)} />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="phone">Telefono *</label>
                                    <input id="phone" placeholder="+39 333 444 5555" type="tel" name="phone" value={dataForm.phone} onChange={(e) => handleForm(e)} />
                                </div>
                            </div>
                        </div>

                        <div className={style.formSection}>
                            <h3 className={style.sectionTitle}>Indirizzo di Spedizione</h3>

                            <div className={style.formGroup}>
                                <label htmlFor="street">Via *</label>
                                <input
                                    id="street"
                                    type="text"
                                    placeholder="Via Roma, 123"
                                    name="street"
                                    value={dataForm.street}
                                    onChange={(e) => handleForm(e)}
                                />
                            </div>

                            <div className={style.formGrid}>
                                <div className={style.formGroup}>
                                    <label htmlFor="city">Città *</label>
                                    <input
                                        id="city"
                                        type="text"
                                        placeholder="Milano"
                                        name="city"
                                        value={dataForm.city}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="province">Provincia *</label>
                                    <input
                                        id="province"
                                        type="text"
                                        placeholder="MI"
                                        name="province"
                                        value={dataForm.province}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </div>
                            </div>

                            <div className={style.formGrid}>
                                <div className={style.formGroup}>
                                    <label htmlFor="postal_code">Codice Postale *</label>
                                    <input
                                        id="postal_code"
                                        type="text"
                                        placeholder="20100"
                                        name="postal_code"
                                        value={dataForm.postal_code}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="country">Paese *</label>
                                    <input
                                        id="country"
                                        type="text"
                                        placeholder="Italia"
                                        name="country"
                                        value={dataForm.country}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={style.checkbox}>
                            <input type="checkbox" id="checkbox" checked={checkeboxData} onChange={(e) => handleCheckbox(e)} />
                            <label htmlFor="checkbox">L'indirizzo di fatturazione coincide con quello di spedizione</label>
                        </div>

                        {!checkeboxData &&
                            <div className={style.formSection}>
                                <h3 className={style.sectionTitle}>Indirizzo di Fatturazione</h3>
                                <div className={style.formGroup}>
                                    <label htmlFor="billing_street">Via *</label>
                                    <input id="billing_street" type="text" placeholder="Via Verdi, 456" name="billing_street" value={dataForm.billing_street} onChange={(e) => handleForm(e)} />
                                </div>
                                <div className={style.formGrid}>
                                    <div className={style.formGroup}>
                                        <label htmlFor="billing_city">Città *</label>
                                        <input id="billing_city" type="text" placeholder="Roma" name="billing_city" value={dataForm.billing_city} onChange={(e) => handleForm(e)} />
                                    </div>
                                    <div className={style.formGroup}>
                                        <label htmlFor="billing_country">Paese *</label>
                                        <input id="billing_country" type="text" placeholder="Italia" name="billing_country" value={dataForm.billing_country} onChange={(e) => handleForm(e)} />
                                    </div>
                                </div>
                            </div>
                        }
                        <button type="submit" className={style.buttonSubmit}>CONFERMA ORDINE</button>
                    </form>
                </div>

                <div className={style.sectionSummary}>
                    <h2>RIEPILOGO ORDINE</h2>
                    <div className={style.sectionProduct}>
                        {cartList.map((product, index) => (
                            <div key={product.slug} className={style.card}>
                                <img src={product.image} alt={product.name} />
                                <div className={style.bodyCard}>
                                    <h2>{product.name}</h2>
                                    <div className={style.productDetails}>
                                        <div className={style.quantityContainer}>
                                            <span>Quantità: {product.quantity}</span>
                                        </div>
                                        <h3 className={style.price}>Prezzo: {(product.price * product.quantity).toFixed(2)}€</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                </div>
            </section>
        </>
    )
}