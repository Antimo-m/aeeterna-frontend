import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import {useState, useEffect } from 'react';
import { useCart } from "../contexts/CartContext"


export default function Header({ searchTerm,  onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartList } = useCart();
  let totalProduct = 0;
  cartList.forEach((product) => {
    totalProduct += 1 * product.quantity;
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    onSearch(e.target.value);
  }

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
            <span className={styles.logoText}>AETERNA SKIN</span>
          </div>

          {/* Navigation Desktop */}
          <nav className={styles.desktopNav}>
            <NavLink to={"/"} className={styles.navLink}>Home</NavLink>
            <NavLink to={"/search"} className={styles.navLink}>Prodotti</NavLink>
          </nav>

          {/* Right section Desktop */}
          <div className={styles.desktopActions}>
            {/* Search */}
            <div className={styles.searchBox}>
              <i className={`bi bi-search ${styles.searchIcon}`}></i>
              <input
                type="text"
                placeholder="Cerca..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              
            </div>
             
            {/* Icons */}
            <Link to={"/wishlist"} className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
            </Link>
            <Link to={"/cart"} className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
              {cartList.length > 0 && 
              <span>{totalProduct}</span>
              }
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <Link to={"/wishlist"} className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
            </Link>
            <Link to={"/cart"} className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
              {cartList.length > 0 && 
              <span>{totalProduct}</span>
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
            <i className={`bi bi-search ${styles.searchIcon}`}></i>
            <input
              type="text"
              placeholder="Cerca..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Navigation links */}
          <nav className={styles.mobileNav}>
            <NavLink onClick={closeMenu} to={"/"} className={styles.navLink}>Home</NavLink>
            <NavLink onClick={closeMenu} to={"/search"} className={styles.navLink}>Prodotti</NavLink>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}
    </header>
  );
};