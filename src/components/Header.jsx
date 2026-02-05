import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import React, { useState, useEffect } from 'react';


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              />
            </div>

            {/* Icons */}
            <NavLink to={"/wishlist"} className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
            </NavLink>
            <NavLink to={"/cart"} className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
            </NavLink>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <button className={styles.iconButton} aria-label="Wishlist">
              <i className="bi bi-heart"></i>
            </button>
            <button className={styles.iconButton} aria-label="Carrello">
              <i className="bi bi-cart"></i>
            </button>
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
            />
          </div>

          {/* Navigation links */}
          <nav className={styles.mobileNav}>
            <a href="#home" className={styles.mobileNavLink} onClick={closeMenu}>
              Home
            </a>
            <a href="#prodotti" className={styles.mobileNavLink} onClick={closeMenu}>
              Prodotti
            </a>
            <a href="#novita" className={styles.mobileNavLink} onClick={closeMenu}>
              Novità
            </a>
            <a href="#contatti" className={styles.mobileNavLink} onClick={closeMenu}>
              Contatti
            </a>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}
    </header>
  );
};