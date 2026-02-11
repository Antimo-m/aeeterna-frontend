import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import styles from "../styles/Quiz.module.css";
import CardProducts from "../components/CardProducts.jsx";
const InsideOutQuiz = () => {
  const { addCart } = useCart();

  const [step, setStep] = useState(0);
  const [results, setResults] = useState({
    Gioia: 0,
    Tristezza: 0,
    Rabbia: 0,
    Disgusto: 0,
    Paura: 0,
  });

  const [finalResult, setFinalResult] = useState(null);
  const [history, setHistory] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      text: "La tua pelle si è appena svegliata: chi c'è alla console dei comandi?",
      image: "http://localhost:3000/image/prima-domanda.jpeg",
      options: [
        {
          label: "☀️ Gioia! Splendo più della Città delle Nuvole",
          type: "Gioia",
        },
        {
          label:
            "☁️ Tristezza... mi sento spenta e 'giù' come un ricordo triste",
          type: "Tristezza",
        },
        {
          label: "🔥 Rabbia! C'è un incendio di sebo sulla fronte!",
          type: "Rabbia",
        },
        {
          label: "💅 Disgusto. Un po' lucida qui, un po' secca lì... uff!",
          type: "Disgusto",
        },
        {
          label: "😱 Paura! Aiuto, un raggio di sole! Mi arrosso subito!",
          type: "Paura",
        },
      ],
    },
    {
      text: "Sei nel 'Pensiero Astratto' e devi scegliere il tuo superpotere:",
      image: "http://localhost:3000/image/seconda-domanda.jpeg",
      options: [
        { label: "✨ Luce infinita per un colorito da Oscar", type: "Gioia" },
        {
          label: "🌊 Un oceano di idratazione per non seccarsi mai",
          type: "Tristezza",
        },
        {
          label: "🧯 Estintore magico per eliminare l'effetto specchio",
          type: "Rabbia",
        },
        {
          label: "⚖️ Il dono dell'equilibrio perfetto tra le zone del viso",
          type: "Disgusto",
        },
        {
          label: "🛡️ Uno scudo invisibile contro ogni rossore molesto",
          type: "Paura",
        },
      ],
    },
    {
      text: "Immagina la tua skincare routine come un 'Treno dei Pensieri':",
      image: "http://localhost:3000/image/terza-domanda.jpeg",
      options: [
        {
          label: "🌈 Un viaggio veloce, radioso e senza intoppi",
          type: "Gioia",
        },
        {
          label: "☁️ Una sosta lunga alla stazione del nutrimento",
          type: "Tristezza",
        },
        {
          label: "💥 Una spedizione punitiva contro i pori dilatati",
          type: "Rabbia",
        },
        {
          label: "🎭 Un percorso misto tra purificazione e morbidezza",
          type: "Disgusto",
        },
        {
          label: "🧸 Un trasporto delicatissimo su binari di seta",
          type: "Paura",
        },
      ],
    },
  ];

  const characterProfiles = {
    Gioia: {
      title: "Effetto Gioia (Pelle Normale)",
      desc: "La tua pelle brilla di pura felicità!",
      products: [
        {
          slug: "pure-cleansing-gel-100ml",
          name: "Pure Cleansing Gel 100ml",
          image: "http://localhost:3000/image/milk-cleanser-150ml.jpg",
          price: 19.90,
        },
        {
          slug: "vitamin-c-brightening-serum-30ml",
          name: "Vitamin C Brightening Serum",
          image: "http://localhost:3000/image/hyaluronic-acid-serum-30ml.jpg",
          price: 29.90,
        },
        {
          slug: "daily-hydrating-cream-50ml",
          name: "Daily Hydrating Cream",
          image: "http://localhost:3000/image/rich-nourishing-cream-50ml.jpg",
          price: 32.90,
        },
      ],
    },
    Tristezza: {
      title: "Effetto Tristezza (Pelle Secca)",
      desc: "La tua pelle ha bisogno di idratazione.",
      products: [
        {
          slug: "milk-cleanser-150ml",
          name: "Milk Cleanser 150ml",
          image: "http://localhost:3000/image/milk-cleanser-150ml.jpg",
          price: 19.90,
        },
        {
          slug: "hyaluronic-acid-serum-30ml",
          name: "Hyaluronic Acid Serum",
          image: "http://localhost:3000/image/hyaluronic-acid-serum-30ml.jpg",
          price: 29.90,
        },
        {
          slug: "rich-nourishing-cream-50ml",
          name: "Rich Nourishing Cream",
          image: "http://localhost:3000/image/rich-nourishing-cream-50ml.jpg",
          price: 32.90,
        },
      ],
    },
    Rabbia: {
      title: "Effetto Rabbia (Pelle Grassa)",
      desc: "Calmiamo il sebo in eccesso.",
      products: [
        {
          slug: "charcoal-gel-cleanser-120ml",
          name: "Charcoal Gel Cleanser",
          image: "http://localhost:3000/image/charcoal-gel-cleanser-120ml.jpg",
          price: 20.90,
        },
        {
          slug: "niacinamide-pore-refining-serum-30ml",
          name: "Niacinamide Pore Refining Serum",
          image:
            "http://localhost:3000/image/niacinamide-pore-refining-serum-30ml.jpg",
          price: 27.90,
        },
        {
          slug: "oil-free-mattifying-cream-50ml",
          name: "Oil-Free Mattifying Cream",
          image:
            "http://localhost:3000/image/oil-free-mattifying-cream-50ml.jpg",
          price: 24.90,
        },
      ],
    },
    Disgusto: {
      title: "Effetto Disgusto (Pelle Mista)",
      desc: "Cerchiamo l'equilibrio perfetto.",
      products: [
        {
          slug: "balancing-witch-hazel-toner-150ml",
          name: "Balancing Witch Hazel Toner",
          image:
            "http://localhost:3000/image/balancing-witch-hazel-toner-150ml.jpg",
          price: 18.90,
        },
        {
          slug: "exfoliating-glycolic-toner-120ml",
          name: "Exfoliating Glycolic Toner",
          image:
            "http://localhost:3000/image/exfoliating-glycolic-toner-120ml.jpg",
          price: 22.90,
        },
        {
          slug: "gel-moisturizer-50ml",
          name: "Gel Moisturizer",
          image: "http://localhost:3000/image/gel-moisturizer-50ml.jpg",
          price: 23.90,
        },
      ],
    },
    Paura: {
      title: "Effetto Paura (Pelle Sensibile)",
      desc: "Proteggiamo la tua pelle delicata.",
      products: [
        {
          slug: "sensitive-cream-cleanser-100ml",
          name: "Sensitive Cream Cleanser",
          image:
            "http://localhost:3000/image/sensitive-cream-cleanser-100ml.jpg",
          price: 23.90,
        },
        {
          slug: "soothing-centella-serum-30ml",
          name: "Soothing Centella Serum",
          image: "http://localhost:3000/image/soothing-centella-serum-30ml.jpg",
          price: 28.90,
        },
        {
          slug: "sensitive-barrier-cream-50ml",
          name: "Sensitive Barrier Cream",
          image: "http://localhost:3000/image/sensitive-barrier-cream-50ml.jpg",
          price: 29.90,
        },
      ],
    },
  };

 // Sostituisci la vecchia funzione addToCart con questa:
  const handleAddToCart = (product) => {
    // Il tuo addCart nel context accetta il prodotto
    // e gestisce già il parsing del prezzo (se lo hai corretto in numero)
    // e la quantità.
    addCart(product);
    
    // Opzionale: un piccolo feedback o apri la preview
    console.log("Prodotto aggiunto:", product.name);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;

    const type = selectedOption.type;
    setHistory((prev) => [...prev, type]);

    const newResults = { ...results, [type]: results[type] + 1 };
    setResults(newResults);
    setSelectedOption(null);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const winner = Object.keys(newResults).reduce((a, b) =>
        newResults[a] > newResults[b] ? a : b,
      );
      setFinalResult(characterProfiles[winner]);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      const lastType = history[history.length - 1];
      setResults({ ...results, [lastType]: results[lastType] - 1 });
      setHistory(history.slice(0, -1));
      setSelectedOption(null);
      setStep(step - 1);
    }
  };

  return (
    <div className={styles.quizWrapper}>
      {!finalResult ? (
        <>
          <h1 className={styles.title}>Che emozione prova la tua pelle?</h1>
          <p className={styles.subtitle}>
            Cura la tua pelle oggi per la bellezza del domani.
          </p>

          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.questionsSection}>
              {step > 0 && (
                <button className={styles.backButton} onClick={handleBack}>
                  ← Torna alla domanda precedente
                </button>
              )}
              <h3 style={{ fontWeight: "400", marginBottom: "20px" }}>
                {questions[step].text}
              </h3>

              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.optionButton} ${selectedOption?.label === opt.label ? styles.selected : ""}`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.label}
                </button>
              ))}

              <button
                className={styles.backButton}
                onClick={handleConfirm}
                disabled={!selectedOption}
              >
                Conferma Risposta
              </button>
            </div>

            <div className={styles.imageSection}>
              <img
                src={questions[step].image}
                alt={`Step ${step + 1}`}
                className={styles.sideImage}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.resultCard}>
          <h1 className={styles.title}>{finalResult.title}</h1>
          <p className={styles.subtitle}>{finalResult.desc}</p>
          <div className={styles.productGrid}>
            {finalResult.products &&
              finalResult.products.map((p, i) => (
                <CardProducts key={i}
                  product={p}/>
                // <div key={i} className={styles.productCard}>
                //   {/* Rendiamo l'immagine cliccabile per il dettaglio */}
                //   <Link
                //     to={`/productdetails/${p.slug}`}  
                //     className={styles.productLink}
                //   >  
                //   <div
                //     style={{
                //       background: "#f9f9f9",
                //       height: "150px",
                //       marginBottom: "10px",
                //     }}
                //   >
                //     <img
                //       src={p.image}
                //       alt={p.name}
                //       className={styles.productImage}
                //     />
                //   </div>
                //   <p style={{ fontSize: "0.9rem", minHeight: "40px" }}>
                //     {p.name}
                //   </p>
                //   </Link>
                //   <span className={styles.price}>{p.price}</span>
                //   <button
                //     className={styles.addToCart}
                //     onClick={() => handleAddToCart(p)}
                //   >
                //     Aggiungi al Carrello
                //   </button>
                // </div>
              ))}
          </div>
          <button
            onClick={() => window.location.reload()}
            className={styles.submitButton}
          >
            Ricomincia il Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default InsideOutQuiz;
