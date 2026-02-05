import style from "../styles/PreFooter.module.css"
export default function PreFooter(){
    return (
        <div className={style.preFooter}>
            <div className={style.card}>
                <i className="bi bi-truck"></i>
                <h3>SPEDIZIONE GRATUITA DA 45€</h3>
            </div>
            <div className={style.card}>
                <i class="bi bi-leaf-fill"></i>
                <h3>INGREDIENTI 100% NATURALI</h3>
            </div>
            <div className={style.card}>
                <i className="bi bi-box-seam-fill"></i>
                <h3>RESO FACILE ENTRO 14 GIORNI</h3>
            </div>
            <div className={style.card}>
                <i className="bi bi-gift-fill"></i>
                <h3>REGALI E ALTRI VANTAGGI</h3>
            </div>
        </div>
    )
}