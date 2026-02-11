import styles from "../styles/Community.module.css";


export default function Community() {
    const cards = [
        {
            id: 1,
            name: "Dixie D'Amelio",
            message: "Dixie ha amato i nostri prodotti (avremmo preferito la sorella Charlie, ma essendo più famosa costava di più). E tu, cosa aspetti a provarli?",
            image: "/image/dixie.jpg"
        },
        {
            id: 2,
            name: "Chiara Ferragni",
            message: "Chiara ha adorato i nostri prodotti, soprattutto quando ha capito che non doveva promuovere pandori.",
            image: "/image/chiaraferragni.jpg"
        },
        {
            id: 3,
            name: "Ed Gein",
            message: "Il carissimo Ed Gein ci ha riferito che le nostre creme sono il miglior prodotto per rendere di nuovo morbide le superfici in pelle dei suoi divani e delle sue lampade.",
            image: "/image/edgein.jpg"
        },
        {
            id: 4,
            name: "Alfonso Signorini",
            message: "Lo zio di tutta Italia preferisce la nostra linea di oli; dice che sia il prodotto che usa di più durante i provini del GF.",
            image: "/image/alfonso.jpg"
        },
        {
            id: 5,
            name: "Freddy Krueger",
            message: "Questa collaborazione parla da sé.",
            image: "/image/freddy.jpg"
        },
        {
            id: 6,
            name: "Gianluca Vacchi",
            message: "Il caro Gianluca Vacchi... su questa collaborazione non siamo molto fieri, scusateci.",
            image: "/image/gianluca.jpg"
        },
        {
            id: 7,
            name: "Patrick Bateman",
            message: "Patrick Bateman, facoltoso imprenditore di Wall Street.",
            image: "/image/patrick.jpg"
        },
        {
            id: 8,
            name: "Loris Barbiero",
            message: "Si dice che sotto la maschera abbia una pelle perfetta quanto la sua lotta al crimine; infatti usa solo prodotti Aeterna Skin.",
            image: "/image/batman.jpg"
        },
        {
            id: 9,
            name: "Donald 'THE ORANGE' Trump",
            message: "L'attuale presidente americano non ha mai usato i nostri prodotti; volevamo però mostrarvi come la sua pelle è stata alterata dai prodotti della concorrenza. Scegliete sempre prodotti originali Aeterna Skin.",
            image: "/image/trump.jpg"
        }
    ]
    return (
        <main className={styles.community}>
            <h1 className={styles.title}>La nostra community parla per noi</h1>
            <p className={styles.subtitle}>
                Scopri le storie di chi ha scelto Aeterna Skin e ha vissuto la propria avventura di bellezza.
            </p>
            <div className={styles.grid}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img src={card.image} alt={card.name} className={styles.image} />
                        </div>
                        <h3 className={styles.name} > {card.name}</h3>
                        <p className={styles.message}>{card.message}</p>
                    </div>
                ))}

            </div>
        </main>
    );
}
