import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/NotFound.module.css"
import style from "../styles/NotFoundProduct.module.css"


export default function NotFound() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5)

    useEffect(() => {
        if (counter === 0){
            navigate("/");
            return;
        }
        const timer = setTimeout(() => {
            setCounter(counter -1)
        }, 1000);

        return () => clearTimeout(timer)
    }, [counter, navigate])

    return (
        <>
            <section className={style.main}>
                <div className={style.container}>
                    <h1> Error 404 😕</h1>
                    <p>Not Found</p>
                    <p className={style.counterText}>Verrai reindirizzato in {counter} secondi</p>
                </div>
            </section>
        </>
    )
}