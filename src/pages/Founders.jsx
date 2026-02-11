import styles from "../styles/Founders.module.css";

export default function Founders() {
    const founders = [
        {
            id: 1,
            name: "Lucia Summa",
            message: "Lucia Summa: ex Ministro dei trasposrti delle orecchiette ora affronta una nuova sfida personale nel ambito delle beauty routine, porta un pensiero innovativo nel quale vuole legare il concetto di beauty routine all marchio aeterna skin come le orecchiette alla puglia ",
            image: "/image/luccia.png"
        },
        {
            id: 2,
            name: "Stiven Mastrovito",
            message: "Stiven Mastrovito ex presidente del Benevento calcio, nel settore è conosciuto come il Dragone, innovatore in questo settore ha portato novità assolute in questo progetto ",
            image: "/image/stiven.png"
        },
        {
            id: 3,
            name: "Midory Rojas",
            message: "Midory Rojas,",
            image: "/image/midory.png"
        },
        {
            id: 4,
            name: "Matteo Le Pera",
            message: "Matteo Le Pera vincitore di 7 Mister Olimpia ha abbandonato la sala da pesi per dedicarsi all css la sua costanza e tenacia l'ha portato a creare la Matteostrap una libreria css usata in tutto il mondo, ora crea classi css per la nostra amata Aeterna Skin.",
            image: "/image/matteo.png"
        },
        {
            id: 5,
            name: "Antimo Montella",
            message: "Antimo Montella collaboratore dei servizi di intelligence italiani nella quale è riuscito a creare degli occhiali che uniscono bellezza estetica e intelligenza artificiale, ora al servizio di un bene superiore ovvero la Aeterna Skin. ",
            image: "/image/antimo.png"
        },
        {
            id: 6,
            name: "Wissem Brahem",
            message: "Wissem Brahem attuale tronista di punta di mediaset, dedito al contribuire nell'estetica di questo progetto e dei prodotti in vendita",
            image: "/image/wissem.png"
        }
    ]
    return (
        <>
            <main >
                <h1 className={styles.title}>La Rubrica jessico</h1>
                <div className={styles.grid}>
                    {
                        founders.map((founder) => (
                            <div key={founder.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={founder.image} alt={founder.name} className={styles.image} />
                                </div>
                                <h3 className={styles.name}> {founder.name} </h3>
                                <p className={styles.message}> {founder.message}</p>
                            </div>
                        ))
                    }
                    </div>
                    <p className={styles.disclaimer}><i class="bi bi-exclamation-triangle-fill"></i>Le immagine visionate in pagina potrebbero non rappresentare la visione reale delle persone mostrate<i class="bi bi-exclamation-triangle-fill"></i></p>          
            </main>
        </>
    );
}