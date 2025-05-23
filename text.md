import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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
import styles from '../styles/Home.module.css';

export default function Header() {
  return (
    <header className={styles.headerSection}>
      <h1>DISCOVER OUR PRODUCTS</h1>
      <h2>
        Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.
        <br/>
         Dolor integer scelerisque nibh amet mi ut elementum dolor.</h2>
    </header>
  );
}
import styles from '../styles/Home.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title} // SEO-friendly alt text
      />
      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.title}</h3>
      <p style={{ color: 'green', fontWeight: 'bold' }}>${product.price}</p>
    </div>
  );
}
import styles from '../styles/Home.module.css';

const categories = [
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" }
];

export default function Sidebar({ selectedCategories, setSelectedCategories }) {
  const handleCheckboxChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== value));
    } else {
      setSelectedCategories(prev => [...prev, value]);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h2>Filter by Category</h2>
      {categories.map(cat => (
        <label key={cat.value}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.value)}
            onChange={() => handleCheckboxChange(cat.value)}
          />
          &nbsp;{cat.label}
        </label>
      ))}
      <button onClick={() => setSelectedCategories([])}>Clear Filters</button>
    </aside>
  );
}
import styles from '../styles/Home.module.css';

export default function SortMenu({ setSort }) {
  return (
    <div className={styles.sortMenu}>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={(e) => setSort(e.target.value)}>
        <option value="recommended">Recommended</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SortMenu from '../components/SortMenu';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [sortedBy, setSortedBy] = useState('recommended');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data));
  }, []);

  const filterProducts = () => {
    let filtered = [...products];

    if (filteredCategories.length > 0) {
      filtered = filtered.filter(product =>
        filteredCategories.includes(product.category)
      );
    }

    switch (sortedBy) {
      case 'low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <>
      <Head>
        <title>FakeStore - Shop the Latest Products</title>
        <meta name="description" content="Browse and shop the latest products at FakeStore. Great prices on electronics, clothing, and more!" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FakeStore - Shop the Latest Products" />
        <meta property="og:description" content="Browse and shop the latest products at FakeStore. Great prices on electronics, clothing, and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.example.com/images/fakestore-banner.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Website",
              "name": "FakeStore",
              "url": "https://www.example.com",
              "description": "Browse and shop the latest products at FakeStore.",
              "image": "https://www.example.com/images/fakestore-banner.jpg",
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
        <Navbar />
        <Header />

        
        <div className={styles.main}>
          <div className={styles.contentWrapper}>
            <Sidebar
              selectedCategories={filteredCategories}
              setSelectedCategories={setFilteredCategories}
            />
            <div className={styles.mainContent}>
              <SortMenu setSort={setSortedBy} />
              <p style={{ padding: '0 1rem' }}>
                {filterProducts().length} product(s) found
              </p>
              <div className={styles.productGrid}>
                {filterProducts().map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        
      </div>
    </>
  );
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.headerSection {
  background-color: #fafafa;
  padding: 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.headerSection h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.headerSection h2 {
  font-size: 1.2rem;
  color: #666;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.contentWrapper {
  display: flex;
  flex-direction: column;
}

.sidebar {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-right: 1px solid #ddd;
  width: 100%;
}

.sidebar h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.sidebar label {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
}

.sidebar input[type="checkbox"] {
  margin-right: 0.5rem;
  transform: scale(1.2);
  accent-color: #0070f3;
}

.sidebar button {
  margin-top: 1rem;
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar button:hover {
  background-color: #e60000;
}

.sortMenu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.productGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.productCard {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.productCard img {
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.footer {
  background-color: #222;
  color: white;
  padding: 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .contentWrapper {
    flex-direction: row;
  }

  .sidebar {
    width: 250px;
    min-height: 100%;
  }

  .mainContent {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .headerSection h1 {
    font-size: 1.8rem;
  }

  .headerSection h2 {
    font-size: 1rem;
  }
}

.header {
  width: 100%;
  height: 188px;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;
}

.navContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.leftIcon {
  width: 36px;
  height: 36px;
  margin-top: 40px;
  margin-left: 96px;
  flex: 1;
  display: flex;
  align-items: center;
}
.leftIcon span {
  width: 36px;
  height: 36px;
  margin-top: 40px;
  margin-left: 96px;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: center;
  font-family: Inter;
  font-weight: 800;
  color: #000000;
  font-size: 20px;
}

.actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  font-size: 16px;
}

.navLinks {
  display: flex;
  justify-content: center;
  gap: 64px; /* updated from 30px to your value */
  padding: 10px 0;
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;

  width: 636px;
  height: 24px;
  position: absolute; /* needed for top/left to work */
  top: 140px;
  left: 402px;
}


.hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .navLinks {
    display: none;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
  }

  .navLinks.open {
    display: flex;
  }

  .hamburger {
    display: block;
    position: absolute;
    right: 20px;
  }

  .logo {
    flex: 100%;
    justify-content: center;
    order: -1;
    margin-top: 10px;
  }

  .actions,
  .leftIcon {
    display: none;
  }
}


/* footer section */

.footer {
  background-color: #000;
  color: #fff;
  padding: 40px 20px;
  font-size: 14px;
  width: 1440px;
  height: 750px;
}

.topSection {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
  text-align: left;
}

.subscribe {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  text-align: center;
}

.subscribe h4 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}

.inputGroup {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.inputGroup input {
  padding: 10px;
  width: 250px;
  border: none;
  border-radius: 4px;
}

.inputGroup button {
  padding: 10px 20px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.inputGroup button:hover {
  background: #e6e6e6;
}

.contact {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
}

.note {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 5px;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
}

.column {
  margin-top: 20px;
  flex: 1;
  min-width: 200px;
}

.column h4 {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
}

.column ul {
  list-style: none;
  padding: 0;
}

.column ul li {
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s;
}

.column ul li:hover {
  color: #ccc;
}

.socials {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px;
}

.socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #fff;
  transition: background 0.3s;
}

.socials a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.payments {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.payments img {
  height: 30px;
  background: #fff;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.bottomLine {
  text-align: center;
  margin-top: 40px;
  font-size: 12px;
  opacity: 0.6;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .topSection {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .contact {
    text-align: center;
  }

  .columns {
    flex-direction: column;
    gap: 20px;
  }

  .inputGroup {
    flex-direction: column;
    align-items: center;
  }

  .inputGroup input {
    width: 100%;
    max-width: 300px;
  }

  .inputGroup button {
    width: 100%;
    max-width: 150px;
  }
}
