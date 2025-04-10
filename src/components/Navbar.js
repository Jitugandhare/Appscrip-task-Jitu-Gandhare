import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Hamburger (Visible on small screens, on left) */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>

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
          <span ><Search style={{cursor:"pointer"}}/></span>
          <span ><Heart style={{cursor:"pointer"}}/></span>
          <span ><ShoppingBag style={{cursor:"pointer"}}/></span>
          <span ><User  style={{cursor:"pointer"}}/></span>
          <span style={{ color: "black",cursor:"pointer" }}>ENG ▼</span>
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
