import styles from "../styles/Founders.module.css";

export default function Founders() {
    const founders = [
        {
            id: 1,
            name: "Lucia Summa",
            message: "Lucia Summa, ex Ministro dei Trasporti, ora affronta una nuova sfida personale nell'ambito delle beauty routine. Porta un pensiero innovativo: vuole legare il concetto di beauty routine al marchio Aeterna Skin, come le orecchiette alla Puglia.",
            image: "/image/lucia.png"
        },
        {
            id: 2,
            name: "Stiven Mastrovito",
            message: "Stiven Mastrovito, ex presidente del Benevento Calcio, è conosciuto come 'il Dragone'. Innovatore nel suo campo, ha portato novità importanti in questo progetto.",
            image: "/image/stiven.png"
        },
        {
            id: 3,
            name: "Midory Rojas",
            message: "Midory Rojas, donna di potere peruviana: dopo aver contribuito allo sviluppo del Perù, si è dedicata alla cura delle persone fondando Aeterna Skin assieme agli altri luminari di questa pagina.",
            image: "/image/midory.png"
        },
        {
            id: 4,
            name: "Matteo Le Pera",
            message: "Matteo Le Pera, vincitore di 7 Mister Olimpia, ha abbandonato la sala pesi per dedicarsi al CSS. La sua costanza e tenacia lo hanno portato a creare la Matteostrap, una libreria CSS usata in tutto il mondo; ora crea classi CSS per la nostra amata Aeterna Skin.",
            image: "/image/matteo.png"
        },
        {
            id: 5,
            name: "Antimo Montella",
            message: "Antimo Montella, collaboratore dei servizi di intelligence italiani, ha contribuito a creare occhiali che uniscono estetica e intelligenza artificiale; ora è al servizio del progetto Aeterna Skin.",
            image: "/image/antimo.png"
        },
        {
            id: 6,
            name: "Wissem Brahem",
            message: "Wissem Brahem, attuale tronista di punta di Mediaset, contribuisce all'estetica di questo progetto e dei prodotti in vendita.",
            image: "/image/wissem.png"
        }
    ]
    return (
        <>
            <main >
                <h1 className={styles.title}>La Rubrica</h1>
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
                    <p className={styles.disclaimer}><i className="bi bi-exclamation-triangle-fill"></i>Le immagini presenti in pagina potrebbero non rappresentare l'aspetto reale delle persone ritratte.<i className="bi bi-exclamation-triangle-fill"></i></p>          
            </main>
        </>
    );
}