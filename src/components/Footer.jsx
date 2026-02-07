import { useState } from "react";
import axios from "axios";
import styles from "../styles/Footer.module.css"


export default function Footer() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });


    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true)
        setMessage({ text: "", type: "" });

        try {
            const response = await axios.post(`${backEndUrl}/api/sendpopup`, {
                email: email
            })
            setMessage({
                text: "Grazie per esserti iscritto! Controlla la tua email.",
                type: "success"
            })

            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 5000)
        }
        catch (error) {
            console.error("Errore iscrizione:", error);
            const errorMessage = error.response?.data?.message ||
                "Si è verificato un errore. Riprova più tardi.";

            setMessage({
                text: errorMessage,
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Newsletter Section */}
                <div className={styles.newsletterSection}>
                    <h2 className={styles.newsletterTitle}>
                        Iscriviti alla nostra Newsletter!
                    </h2>

                    <p className={styles.newsletterSubtitle}>
                        <span className={styles.gold}>Il tuo appuntamento</span>
                        <br />
                        <span className={styles.gold}>con le novità e </span>
                        <span className={styles.black}>offerte esclusive!</span>
                    </p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Inserisci il tuo indirizzo mail..."
                            className={styles.emailInput}
                            required
                        />

                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="privacy"
                                className={styles.checkbox}
                                required
                            />
                            <label htmlFor="privacy" className={styles.checkboxLabel}>
                                Avendo letto e compreso l'informativa sulla privacy (vedi link sottostante),
                                presto il mio consenso per le seguenti finalità di trattamento da parte di Aeterna Skin.
                                <br />
                                <a href="#" className={styles.privacyLink}>Info sulla privacy</a>
                            </label>
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? "INVIO..." : "ISCRIVITI"}
                        </button>
                        {message.text && (
                            <div className={`${styles.message} ${styles[message.type]}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </div>

                {/* Columns Section */}
                <div className={styles.columnsSection}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>LA NOSTRA AZIENDA</h3>
                        <ul className={styles.columnList}>
                            <li><a href="#">Chi siamo noi</a></li>
                            <li><a href="#">Lavora per noi</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>AETERNA SKIN SINONIMO DI BELLEZZA</h3>
                        <ul className={styles.columnList}>
                            <li><a href="#">Persone che hanno adorato i nostri prodotti</a></li>
                            <li><a href="#">Contattaci</a></li>
                            <li><a href="#">Condizioni d'uso</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Social Section */}
            <div className={styles.socialSection}>
                <p className={styles.socialTitle}>SEGUICI SU</p>
                <div className={styles.socialIcons}>
                    <a href="#" aria-label="YouTube">
                        <i className="bi bi-youtube"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" aria-label="TikTok">
                        <i className="bi bi-tiktok"></i>
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.footBottom}>
                <p>
                    REALIZZATO CON
                    <span>
                        <i className="bi bi-suit-heart-fill"></i>
                    </span>
                    DA FORREST GAP
                </p>
            </div>
        </footer>
    );

}