import styles from "../styles/Footer.module.css"


export default function Footer() {
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

                    <input
                        type="email"
                        placeholder="Inserisci il tuo indirizzo mail..."
                        className={styles.emailInput}
                    />

                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="privacy"
                            className={styles.checkbox}
                        />
                        <label htmlFor="privacy" className={styles.checkboxLabel}>
                            Avendo letto e compreso l'informativa sulla privacy (vedi link sottostante),
                            presto il mio consenso per le seguenti finalità di trattamento da parte di Aeterna Skin.
                            <br />
                            <a href="#" className={styles.privacyLink}>Info sulla privacy</a>
                        </label>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        ISCRIVITI
                    </button>
                </div>

                {/* Columns Section */}
                <div className={styles.columnsSection}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>COLONNA FOOT 1</h3>
                        <ul className={styles.columnList}>
                            <li><a href="#">Elemento lista</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>COLONNA FOOT 2</h3>
                        <ul className={styles.columnList}>
                            <li><a href="#">Elemento lista</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>COLONNA FOOT 3</h3>
                        <ul className={styles.columnList}>
                            <li><a href="#">Elemento lista</a></li>
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