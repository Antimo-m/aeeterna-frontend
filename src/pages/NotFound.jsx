import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/NotFound.module.css"

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/")
        }, 5000)
        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <>
            <section>
                <div className={styles.notFoundContainer}>
                    <h1 className={styles.notFoundTitle}>404</h1>
                    <h2 className={styles.notFoundText}>Pagina non trovata. Verrai riportato alla Home tra 5 secondi, attendi gentilmente...</h2>
                </div>
            </section>
        </>
    )
}