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
