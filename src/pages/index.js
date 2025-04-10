import { useEffect, useState } from 'react';
import { ChevronRight, ArrowLeft, ChevronLeft } from 'lucide-react';
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
  const [showSideMenu, setShowSideMenu] = useState(true)

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
        <title>Appscrip-task</title>
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
        {/* hide filter */}
        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "0 1rem", borderBottom: "1px solid #ddd" }}>
          {/* Left Side: Product count and Show/Hide sidebar */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: "1rem", fontWeight: "500", color: "#333" }}>
              {filterProducts().length} product(s) found
            </p>

            <p
              onClick={() => setShowSideMenu(!showSideMenu)}
              style={{
                cursor: "pointer",
                color: "gray",
                fontSize: "1rem",
                fontWeight: "600",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "black"}
              onMouseLeave={(e) => e.target.style.color = "black"}
            >
              {showSideMenu ? "Hide" : "Show"}
              {showSideMenu ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </p>
          </div>

          {/* Right Side: Sort Menu */}
          <SortMenu setSort={setSortedBy} />
        </div>
        <div className={styles.main}>

          <div  >
            {showSideMenu ? (<Sidebar
              selectedCategories={filteredCategories}
              setSelectedCategories={setFilteredCategories}
            />) : ""}

          </div>

          <div className={styles.productGrid} >
            {filterProducts().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
        <Footer />

      </div>
    </>
  );
}
