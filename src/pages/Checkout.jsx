import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import style from "../styles/Checkout.module.css"
import { useNavigate } from "react-router-dom";




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
        if (checkeboxData){
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
        if(totalPrice >= 45){
            shipping_price = null;
        }else{
            totalPrice += shipping_price;
        }
        console.log(totalPrice);
        

        setDataForm({
            ...dataForm,
            shipping_price: shipping_price,
            total_price: totalPrice
        })

        const productsForm = cartList.map((product) =>{
            return {
                slug: product.slug,
                quantity: product.quantity,
                price_at_purchase: product.price
            }
        })

        setDataForm({
            ...dataForm,
            products: productsForm
        })

        console.log({...dataForm,
            products: productsForm,
            total_price: totalPrice
        });
    
        setErrorMessage({
            type: "correct",
            message: "Ordine inviato con successo"
        })
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
                    <form action="" className={style.shippingForm} onSubmit={(e) => submitForm(e)}>
                        <div className={style.name_surname}>
                            <label htmlFor="">Nome</label>
                            <input placeholder="Mario..." type="text" name="name" value={dataForm.name} onChange={(e) => handleForm(e)} />
                            <label htmlFor="">Cognome</label>
                            <input placeholder="Rossi..." type="text" name="surname" value={dataForm.surname} onChange={(e) => handleForm(e)} />
                        </div>
                        <div className="email">
                            <label htmlFor="">Email</label>
                            <input placeholder="MarioRossi@gm..." type="text" name="email" value={dataForm.email} onChange={(e) => handleForm(e)} />
                        </div>
                        <div className={style.phone}>
                            <label htmlFor="">Telefono</label>
                            <input placeholder="3334445555..." type="text" name="phone" value={dataForm.phone} onChange={(e) => handleForm(e)} />
                        </div>
                        <div className="indirizzo">
                            <label htmlFor="">Indirizzo</label>
                            <input type="text" placeholder="Via..." name="street" value={dataForm.street} onChange={(e) => handleForm(e)} />
                            <input type="text" placeholder="Citta..." name="city" value={dataForm.city} onChange={(e) => handleForm(e)} />
                            <input type="text" placeholder="Provincia.." name="province" value={dataForm.province} onChange={(e) => handleForm(e)} />
                            <input type="text" placeholder="Paese..." name="country" value={dataForm.country} onChange={(e) => handleForm(e)} />
                            <input type="text" placeholder="Codice Postale..." name="postal_code" value={dataForm.postal_code} onChange={(e) => handleForm(e)} />
                        </div>
                        <div className={style.checkbox}>
                            <label htmlFor="checkbox">Indirizzo di fatturazione coincide con quello di spedizione</label>
                            <input type="checkbox" name="" id="checkbox" value={checkeboxData} onChange={(e) => handleCheckbox(e)} />
                        </div>
                        {!checkeboxData &&
                            <div className={style.billingData}>
                                <label htmlFor="">INDIRIZZO DI FATTURAZIONE</label>
                                <input type="text" placeholder="Via..." name="billing_street" value={dataForm.billing_street} onChange={(e) => handleForm(e)} />
                                <input type="text" placeholder="Citta..." name="billing_city" value={dataForm.billing_city} onChange={(e) => handleForm(e)} />
                                <input type="text" placeholder="Paese..." name="billing_country" value={dataForm.billing_country} onChange={(e) => handleForm(e)} />
                            </div>
                        }
                        <button type="submit" className={style.buttonSubmit}>CONFERMA</button>
                    </form>
                </div>

                <div className={style.sectionSummary}>
                    <h2>RIEPILOGO ORDINE</h2>
                    <div className={style.sectionProduct}>
                        {cartList.map((product, index) => (
                            <div key={product.slug} className={style.card}>
                                <img src={product.image} alt="" />
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