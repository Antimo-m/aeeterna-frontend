import {Link} from "react-router-dom"
import style from "../styles/NotFoundProduct.module.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function NotFoundProduct() {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(5)


    useEffect(() => {
        if (counter === 0) {
            navigate("/prodotti");
            return;
        }

        const timer = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter, navigate]);


    return (

        <main className={style.main}>
            <div className={style.container}>
                <h1>😕 Prodotto non trovato</h1>
                <p>Il prodotto che stai cercando non esiste o è stato rimosso.</p>
                <Link to="/prodotti" className={style.goShop}>Vai allo shop</Link>
            </div>
        </main>
    )
}

export default NotFoundProduct