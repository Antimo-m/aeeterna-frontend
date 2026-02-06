import { useState, useEffect } from "react";
import styles from "../styles/WelcomePopup.module.css";


export default function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000)
        return () => clearTimeout(timer);
    }, [])


    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button
                    className={styles.closeButton}
                    aria-label="Chiudi popup"
                >
                    ×
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

                    <form className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="La tua email"
                                className={styles.emailInput}
                                required
                            />
                            <button type="submit" className={styles.submitButton}>
                                ISCRIVITI
                            </button>
                        </div>
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