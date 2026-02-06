import { useState, useEffect } from "react"
import styles from "../styles/Products.module.css"
import { useNavigate } from "react-router-dom"
import { useLoad } from "../contexts/LoadContext"
import axios from "axios"
import CardProduct from "../components/CardProducts"

const backupFilter = {
    skinType: 0,
    category: 0,
    search: "",
    minPrice: 0,
    maxPrice: 999,
    limit: 10,
    offset: 0,
}


export default function Products() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(backupFilter)
    const [pageLoad, setPageLoad] = useState(false);
    const { Load, setLoad } = useLoad();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    setLoad(false)

    useEffect(() => {
        setPageLoad(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axios.get(`${backEndUrl}/api/product?category=${filter.category}&skinType=${filter.skinType}&limit=${filter.limit}&offset=${filter.offset}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=`).then((resp) => {
            setProducts(resp.data)
            console.log(resp.data);
            setPageLoad(false)

        }).catch((err) => {
            console.error(err);
        })
    }, [search, page])

    function searchFilter() {
        setPage(1)
        setSearch((cur) => !cur)
    }

    useEffect(() => {
        setFilter({
            ...filter,
            offset: filter.limit * page
        })
    }, [page])

    function handleFilterChange(event) {
        const { name, value } = event.target;

        name != "search" && parseInt(value)

        if ((name === "category" || name === "skinType") && (value < 0 || value > 5)) {
            setErrorMessage("Inserisci un tipo di categoria esistente")
        }

        if (name === "limit" && (value < 5 || value > 80)) {
            setErrorMessage("Inserisci un impaginazione valida")
        }

        if (name === "search" && (value.length > 50 || typeof (value) !== "string")) {
            setErrorMessage("Inserisci un filtro di nome valida")
        }

        setFilter(prev => ({
            ...prev,
            [name]: value,
        }));
    }




    function handleFilterRange(event) {
        const { name, value } = event.target;
        const numericValue = parseInt(value);
        const gap = 10;

        if (name === "minPrice" && (value < 0 || value > 998)) {
            setErrorMessage("Inserisci un prezzo minimo valido")
        }
        if (name === "maxPrice" && (value < 1 || value > 999)) {
            setErrorMessage("Inserisci un prezzo massimo valido")
        }

        setFilter(prev => {
            if (name === "minPrice") {
                return {
                    ...prev,
                    minPrice: Math.min(numericValue, prev.maxPrice - gap),
                };
            }

            if (name === "maxPrice") {
                return {
                    ...prev,
                    maxPrice: Math.max(numericValue, prev.minPrice + gap),
                };
            }

            return prev;
        });
    }






    return (
        <main className={styles.container}>
            <div className={styles.searchSection}>
                <input
                    type="text"
                    placeholder="CERCA PER NOME..."
                    name="search"
                    onChange={handleFilterChange}
                    className={styles.searchInput}
                />
            </div>

            {/* Sezione Filtri Radio */}
            <div className={styles.openFilter} onClick={() => setOpenFilter((cur) => !cur)}>
                <h2 className={styles.filterTitle}>Filtra</h2>
                <i
                    className={`bi ${openFilter ? "bi-chevron-up" : "bi-chevron-down"
                        } ${styles.filterIcon}`}
                />
            </div>
            {
                openFilter &&
                <div className={styles.filterSection}>
                    <div className={styles.filterGroup}>
                        <h3>Tipo di pelle</h3>
                        <label>
                            <input type="radio" name="skinType" value="0" checked={filter.skinType === "0"} onChange={handleFilterChange} />
                            Tutte
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="1" onChange={handleFilterChange} />
                            Normale
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="2" onChange={handleFilterChange} />
                            Secca
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="3" onChange={handleFilterChange} />
                            Grassa
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="4" onChange={handleFilterChange} />
                            Mista
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="5" onChange={handleFilterChange} />
                            Sensibile
                        </label>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3>Categoria</h3>
                        <label>
                            <input type="radio" name="category" value="0" checked={filter.category === "0"} onChange={handleFilterChange} />
                            Tutte
                        </label>
                        <label>
                            <input type="radio" name="category" value="1" onChange={handleFilterChange} />
                            Detergenti
                        </label>
                        <label>
                            <input type="radio" name="category" value="2" onChange={handleFilterChange} />
                            Sieri
                        </label>
                        <label>
                            <input type="radio" name="category" value="3" onChange={handleFilterChange} />
                            Creme Idratanti
                        </label>
                        <label>
                            <input type="radio" name="category" value="4" onChange={handleFilterChange} />
                            Maschere
                        </label>
                        <label>
                            <input type="radio" name="category" value="5" onChange={handleFilterChange} />
                            Tonici
                        </label>
                    </div>
                    <div className={styles.filterGroup_rangeInput}>
                        <h3>Prezzo</h3>
                        <div>
                            <input name="minPrice" className={styles.minPrice} type="number" value={filter.minPrice} onChange={(event) => handleFilterChange(event)} />
                            <input name="maxPrice" className={styles.minPrice} type="number" value={filter.maxPrice} onChange={(event) => handleFilterChange(event)} />
                        </div>
                        <div className={styles.rangeInput}>
                            <input type="range" name="minPrice" id="" min={10} max={999} value={filter.minPrice} onChange={(event) => handleFilterRange(event)} />
                            <input type="range" name="maxPrice" id="" min={10} max={999} value={filter.maxPrice} onChange={(event) => handleFilterRange(event)} />
                        </div>
                    </div>
                    <div className={styles.buttonFilter}>
                        <button onClick={searchFilter}>CERCA</button>
                    </div>
                </div>

            }


            {products.length === 0 ?
                <div>
                    Nessun prodotto trovato con questi filtri
                </div>
                :
                <>
                    <div className={styles.productGrid}>

                        {products.map((product, index) => (
                            <CardProduct key={index}
                                product={product} />
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        <button className={styles.navButton} disabled={page <= 1} onClick={() => setPage((cur) => cur - 1)}>Indietro</button>
                        <button className={styles.navButton} onClick={() => setPage((cur) => cur + 1)}>Avanti</button>
                    </div>
                </>

            }


        </main>
    )
}