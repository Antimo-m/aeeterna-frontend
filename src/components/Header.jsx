import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useState, useEffect } from 'react';
import { useCart } from "../contexts/CartContext"
import { useWishList } from "../contexts/WishListContext"


export default function Header({ searchTerm, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigate();
  const { cartList, showPreview, setShowPreview } = useCart();
  const { wishList } = useWishList();
  const [search, setSearch] = useState("");
  let totalProductCart = 0;
  cartList.forEach((product) => {
    totalProductCart += 1 * product.quantity;
  })



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add(styles.menuOpen);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove(styles.menuOpen);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.classList.remove(styles.menuOpen);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <i className="bi bi-truck"></i>
          <span>SPEDIZIONE GRATUITA DA 45€</span>
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link to={"/"} className={styles.logoText}>AETERNA SKIN</Link>
          </div>

          {/* Navigation Desktop */}
          <nav className={styles.desktopNav}>
            <NavLink to={`/prodotti?category=0&skinType=0&limit=10&offset=0&minPrice=0&maxPrice=9999&search=&order=a-z`} className={styles.navLink}>Prodotti</NavLink>
          </nav>

          {/* Right section Desktop */}
          <div className={styles.desktopActions}>
            {/* Search */}
            <div className={styles.searchBox}>
              <i onClick={() => { navigation(`/prodotti?category=0&skinType=0&limit=10&offset=0&minPrice=0&maxPrice=9999&search=${search}&order=a-z`); setSearch("") }} className={`bi bi-search ${styles.searchIcon}`}></i>
              <input
                type="text"
                placeholder="Cerca..."
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Icons */}
            <Link to={"/wishlist"} className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
              {wishList.length > 0 &&
                <span>{wishList.length}</span>
              }
            </Link>
            <Link onClick={() => setShowPreview(!showPreview)} className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
              {cartList.length > 0 &&
                <span>{totalProductCart}</span>
              }
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <Link to={"/wishlist"} className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
              {wishList.length > 0 &&
                <span>{wishList.length}</span>
              }
            </Link>
            <Link onClick={() => setShowPreview(!showPreview)} className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
              {cartList.length > 0 &&
                <span>{totalProductCart}</span>
              }
            </Link>
            <button
              className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          {/* Search in mobile menu */}
          <div className={styles.mobileSearchBox}>
            <i onClick={() => { navigation(`/prodotti?category=0&skinType=0&limit=10&offset=0&minPrice=0&maxPrice=9999&search=${search}&order=a-z`); setSearch("") }} className={`bi bi-search ${styles.searchIcon}`}></i>
            <input
              type="text"
              placeholder="Cerca..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Navigation links */}
          <nav className={styles.mobileNav}>
            <NavLink onClick={closeMenu} to={`/prodotti?category=0&skinType=0&limit=10&offset=0&minPrice=0&maxPrice=9999&search=&order=a-z`} className={styles.navLink}>Prodotti</NavLink>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}
    </header>
  );
};