import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Left Icon */}
        <div className={styles.leftIcon}>
          <span>🌸</span>
        </div>

        {/* Center Logo */}
        <div className={styles.logo}>
          <Link href="/">LOGO</Link>
        </div>

        {/* Right Icons */}
        <div className={styles.actions}>
          <span>🔍</span>
          <span>🤍</span>
          <span>🛍️</span>
          <span>👤</span>
          <span>ENG ▼</span>
        </div>

        {/* Hamburger */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="#">SHOP</Link>
        <Link href="#">SKILLS</Link>
        <Link href="#">STORIES</Link>
        <Link href="#">ABOUT</Link>
        <Link href="#">CONTACT US</Link>
      </nav>
    </header>
  );
}
