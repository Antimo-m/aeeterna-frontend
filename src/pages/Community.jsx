import styles from "../styles/Community.module.css";


export default function Community() {
    const cards = [
        {
            id: 1,
            name: "Dixie D'Amelio",
            message: "Dixie ha amato i nostri prodotti (anche se avremmo preferito la sorella charlie ma essendo più famosa costava di più) e tu cosa aspetti a provarci.",
            image: "/image/dixie.jpg"
        },
        {
            id: 2,
            name: "Chiara Ferragni",
            message: "Chiara ha adorato i nostri prodotti, ancora di più quando ha capito che non doveva promuovere pandori.",
            image: "/image/chiaraferragni.jpg"
        },
        {
            id: 3,
            name: "Ed Gein",
            message: "Il carissimo Ed Gein ci ha riferito che le nostre creme sono il miglior prodotto per rendere di nuovo morbidi le pelli dei suoi divani e delle sue lampade.",
            image: "/image/edgein.jpg"
        },
        {
            id: 4,
            name: "Alfonso Signorini",
            message: "Lo zio di tutta italia preferisce la nostra linea di oli, dice che siano il prodotto che usa di più durante i provini del GF.",
            image: "/image/alfonso.jpg"
        },
        {
            id: 5,
            name: "Freddy Krueger",
            message: " Questa collab parla da se.",
            image: "/image/freddy.jpg"
        },
        {
            id: 6,
            name: "Gianluca Vacchi",
            message: "Il caro Gianluca Vacchi... ecco di questa collab non ne andiamo molto fieri, scusateci. ",
            image: "/image/gianluca.jpg"
        },
        {
            id: 7,
            name: "Patrick Bateman",
            message: "Patrick bateman facoltoso imprenditore di wallstreet,  ",
            image: "/image/patrick.jpg"
        },
        {
            id: 8,
            name: "Loris barbiero",
            message: "Gira voce che sotto la maschera abbia una pelle perfetta quanto la sua lotta al crimine, in effetti usa solo prodotti aeterna skin.",
            image: "/image/batman.jpg"
        },
        {
            id: 9,
            name: "Donald 'THE ORANGE' Trump",
            message: "L'attuale presidente Americano non ha mai usato i nostri prodotti, ma volevamo mostrarvi come è stata ridotta la sua pelle dai prodotti della concorrenza, per questo scegliete sempre prodotti originali Aeterna Skin.",
            image: "/image/trump.jpg"
        }
    ]
    return (
        <main className={styles.community}>
            <h1 className={styles.title}>La nostra community parla per noi</h1>
            <p className={styles.subtitle}>
                Scopri le storie di chi ha scelto Aeterna skin e ha vissuto la propria avventura di bellezza.
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
