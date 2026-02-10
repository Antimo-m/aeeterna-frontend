import { useState, useEffect } from "react"
import styles from "../styles/Products.module.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import CardProduct from "../components/CardProducts"
import LoadWrapper from "../components/LoadWrapper"
import useDebounce from "../components/useDebounce"

const backupFilter = {
    skinType: "0",
    category: "0",
    search: "",
    minPrice: "0",
    maxPrice: "999",
    limit: "10",
    offset: "0",
    order: "a-z"
}


export default function Products() {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;


    const [searchParams, setSearchParams] = useSearchParams();


    const [products, setProducts] = useState([]);
    const [pageLoad, setPageLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [totalPage, setTotalPage] = useState(null)
    const [totalProduct, setTotalProduct] = useState(null)
    const [filter, setFilter] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const initial = { ...backupFilter };

        Object.keys(backupFilter).forEach(key => {
            if (params.has(key)) {
                initial[key] = params.get(key);
            }
        });

        return initial;
    })
    const debouncedSearch = useDebounce(filter.search, 500);
    const debouncedMinPrice = useDebounce(filter.minPrice, 500);
    const debouncedMaxPrice = useDebounce(filter.maxPrice, 500);


    useEffect(() => {
        loadProducts();
    }, [filter.category,filter.skinType,filter.limit, filter.offset, filter.order, debouncedSearch, debouncedMinPrice,debouncedMaxPrice]);

    useEffect(() => {
        setPage(1);
    }, [filter.category, filter.skinType, debouncedSearch, debouncedMinPrice, debouncedMaxPrice]);

    function loadProducts() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setPageLoad(true);
        axios.get(`${backEndUrl}/api/product`, {
            params: {
                category: filter.category,
                skinType: filter.skinType,
                limit: filter.limit,
                offset: filter.offset,
                order: filter.order,
                search: debouncedSearch,
                minPrice: debouncedMinPrice,
                maxPrice: debouncedMaxPrice
            }
        })
            .then(resp => {
                setProducts(resp.data.products);
                setTotalPage(resp.data.totalPage)
                setTotalProduct(resp.data.totalProduct)
            })
            .catch(err => {
                console.error(err);
            }).finally(() => {
                setPageLoad(false);
            });
    }

    // useEffect(() => {
    //     loadProducts();
    // }, [filter.offset, filter.limit, filter.order])

    useEffect(() => {
        
        setFilter({
            ...filter,
            offset: filter.limit * (page - 1)
        })
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set("offset", filter.limit * (page - 1));
            return params;
        });
    }, [page])

    function handleFilterChange(event) {
        const { name, value } = event.target;

        if (name === "order" && (value !== "a-z" || value !== "prezzoMin" || value !== "prezzoMax")) {
            setErrorMessage("Inserisci un tipo di ordinamento esistente")

        }

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

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set(name, value);
            return params;
        });
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
 

        setPage(1)
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

        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set(name, value);
            return params;
        });
    }

    return (
        <main className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="search"
                            value={filter.search}
                            onChange={(e) => handleFilterChange(e)}
                            className={styles.searchInput}
                        />
                        {!filter.search && <span className={styles.animatedPlaceholder}>Es. Crema Idratante</span>}
                    </div>
                   {/*  <button
                        onClick={() => {
                            setPage(1); // torna alla prima pagina quando cerchi
                            loadProducts(); // richiama la funzione che carica i prodotti

                        }}
                        className={styles.searchButton}
                    >
                        CERCA
                    </button> */}
                </div>
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
                            <input type="radio" name="skinType" value="1" checked={filter.skinType === "1"} onChange={handleFilterChange} />
                            Normale
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="2" checked={filter.skinType === "2"} onChange={handleFilterChange} />
                            Secca
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="3" checked={filter.skinType === "3"} onChange={handleFilterChange} />
                            Grassa
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="4" checked={filter.skinType === "4"} onChange={handleFilterChange} />
                            Mista
                        </label>
                        <label>
                            <input type="radio" name="skinType" value="5" checked={filter.skinType === "5"} onChange={handleFilterChange} />
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
                            <input type="radio" name="category" value="1"  checked={filter.category === "1"} onChange={handleFilterChange} />
                            Detergenti
                        </label>
                        <label>
                            <input type="radio" name="category" value="2" checked={filter.category === "2"} onChange={handleFilterChange} />
                            Sieri
                        </label>
                        <label>
                            <input type="radio" name="category" value="3" checked={filter.category === "3"} onChange={handleFilterChange} />
                            Creme Idratanti
                        </label>
                        <label>
                            <input type="radio" name="category" value="4" checked={filter.category === "4"} onChange={handleFilterChange} />
                            Maschere
                        </label>
                        <label>
                            <input type="radio" name="category" value="5" checked={filter.category === "5"} onChange={handleFilterChange} />
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
                </div>

            }

            {pageLoad ?
                <LoadWrapper />
                :
                products.length === 0 ?
                    <div>
                        Nessun prodotto trovato con questi filtri
                    </div>
                    :
                    <>
                        <div className={styles.totalProduct}>
                            <h2>Prodotti trovati: {totalProduct}</h2>
                            <div className="sectionOrder">
                                <label className={styles.labelLimit} htmlFor="ordina">Ordina per: </label>
                                <select className={styles.selectLimit} name="order" id="ordina" value={filter.order} onChange={(event) => handleFilterChange(event)}>
                                    <option value="a-z">Nome A-Z</option>
                                    <option value="prezzoMin">Prezzo crescente</option>
                                    <option value="prezzoMax">Prezzo decrescente</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.productGrid}>
                            {products.map((product, index) => (
                                <CardProduct key={index}
                                    product={product} />
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            <div>
                                <label className={styles.labelLimit} htmlFor="limit">Prodotti per pagina: </label>
                                <select className={styles.selectLimit} name="limit" id="limit" value={filter.limit} onChange={(event) => { handleFilterChange(event), setPage(1) }}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div>
                                <button className={styles.navButton} disabled={page <= 1} onClick={() => setPage((cur) => cur - 1)}>Indietro</button>
                                <span className={styles.spanButton}>Pagina {page} / {totalPage}</span>
                                <button disabled={page === totalPage} className={styles.navButton} onClick={() => setPage((cur) => cur + 1)}>Avanti</button>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}