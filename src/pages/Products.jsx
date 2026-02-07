import { useState, useEffect } from "react"
import styles from "../styles/Products.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import CardProduct from "../components/CardProducts"
import LoadWrapper from "../components/LoadWrapper"

const backupFilter = {
    skinType: 0,
    category: 0,
    search: null,
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
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [totalPage, setTotalPage] = useState(null)
    const [totalProduct, setTotalProduct] = useState(null)
    const [filterOrderProduct, setFilterOrderProduct] = useState("a-z");

    function loadProducts() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setPageLoad(true);
        axios.get(`${backEndUrl}/api/product?category=${filter.category}&skinType=${filter.skinType}&limit=${filter.limit}&offset=${filter.offset}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&search=${search}`)
            .then(resp => {
                setProducts(resp.data.products);
                setTotalPage(resp.data.totalPage)
                setTotalProduct(resp.data.totalProduct)
                orderProduct(resp.data.products, filterOrderProduct)
                console.log(resp.data);
            })
            .catch(err => {
                console.error(err);
            }).finally(() => {
                setPageLoad(false);
            });
    }

    useEffect(() => {
        loadProducts();
    }, [filter.offset, filter.limit, filterOrderProduct])

    useEffect(() => {
        setFilter({
            ...filter,
            offset: filter.limit * (page - 1)
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

    function orderProduct(array, filter) {
        if (filter === "a-z") {
            array.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            setProducts(array)
        }

        if (filter === "prezzoMin") {
            array.sort((a, b) => {
                if(a.price < b.price){
                    return -1
                }
                if(a.price > b.price){
                    return 1
                }
                return 0
            })
            setProducts(array)
        }

        if (filter === "prezzoMax") {
            array.sort((a, b) => {
                if(a.price > b.price){
                    return -1
                }
                if(a.price < b.price){
                    return 1
                }
                return 0
            })
            setProducts(array);
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                        {!search && <span className={styles.animatedPlaceholder}>Es. Crema Idratante</span>}
                    </div>
                    <button
                        onClick={() => {
                            setPage(1); // torna alla prima pagina quando cerchi
                            loadProducts(); // richiama la funzione che carica i prodotti

                        }}
                        className={styles.searchButton}
                    >
                        CERCA
                    </button>
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
                                <select className={styles.selectLimit} name="ordina" id="ordina" value={filterOrderProduct} onChange={(e) => setFilterOrderProduct(event.target.value)}>
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