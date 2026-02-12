import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/WelcomePopup.module.css";

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
}


export default function WelcomePopup() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [checkMail, setCheckMail] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [])

    function handleClose() {
        setIsVisible(false)
        localStorage.setItem('hasSeenWelcomePopup', 'true');
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage({ text: "", type: "" });

        if (!validateEmail(email)) {
            setMessage({ text: "Inserisci una email valida", type: "error" });
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(`${backEndUrl}/api/sendpopup`, { email });

            setMessage({
                text: "Grazie per esserti iscritto! Controlla la tua email.",
                type: "success"
            });

            localStorage.setItem('hasSeenWelcomePopup', 'true');

            setTimeout(() => setIsVisible(false), 2000);

        } catch (error) {
            console.error("Errore iscrizione:", error);
            const errorMessage = error.response?.data?.message || "Si è verificato un errore. Riprova più tardi.";

            setMessage({ text: errorMessage, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }


    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    aria-label="Chiudi popup"
                >
                    <i className="bi bi-x"></i>
                </button>

                <div className={styles.content}>
                    <div className={styles.decorativeElement}></div>

                    <h2 className={styles.title}>
                        Benvenuta nella famiglia
                        <span className={styles.brandName}>Aeterna Skin</span>
                    </h2>

                    <p className={styles.subtitle}>
                        Iscriviti alla newsletter per ricevere <strong>le offerte</strong> in anteprima
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="La tua email"
                                className={styles.emailInput}
                                required
                            />
                            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                                {isLoading ? "INVIO..." : "ISCRIVITI"}
                            </button>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="privacy"
                                className={styles.checkbox}
                                checked={checkMail}
                                onChange={(e) => setCheckMail(e.target.checked)}
                                required
                            />
                            <label htmlFor="privacy" className={styles.checkboxLabel}>
                                Avendo letto e compreso l'informativa sulla privacy,
                                presto il mio consenso per il trattamento dei dati da parte di Aeterna Skin.
                                <br />
                                <a href="#" className={styles.privacyLink}>Info sulla privacy</a>
                            </label>
                        </div>
                        {message.text && (
                            <div className={`${styles.message} ${styles[message.type]}`}>
                                {message.text}
                            </div>
                        )}
                    </form>

                    <p className={styles.disclaimer}>
                        Accedendo, accetti di ricevere comunicazioni da Aeterna Skin.
                        Puoi annullare l'iscrizione in qualsiasi momento.
                    </p>

                    <div className={styles.benefits}>
                        <div className={styles.benefit}>
                            <i className="bi bi-gift"></i>
                            <span>Offerte esclusive</span>
                        </div>
                        <div className={styles.benefit}>
                            <i className="bi bi-bell"></i>
                            <span>Nuovi arrivi</span>
                        </div>
                        <div className={styles.benefit}>
                            <i className="bi bi-star"></i>
                            <span>Consigli beauty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}