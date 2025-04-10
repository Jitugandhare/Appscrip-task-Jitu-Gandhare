// import styles from '../styles/Home.module.css';

// export default function ProductCard({ product }) {
//   return (
//     <div className={styles.productCard}>
//       <img
//         src={product.image}
//         alt={product.title} // SEO-friendly alt text
//       />
//       <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.title}</h3>
//       <p style={{ color: 'green', fontWeight: 'bold' }}>${product.price}</p>
//     </div>
//   );
// }

import { Heart } from 'lucide-react';  // Import the Heart icon
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false); 

  const toggleLike = () => {
    setLiked((prevState) => !prevState); 
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title} 
      />
      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.title}</h3>
      <p style={{ color: 'green', fontWeight: 'bold' }}>${product.price}</p>
      <div
        style={{
         
          display: 'flex',         
          alignItems: 'center',   
        }}
      >
        <p style={{ fontSize: '9px', color: 'gray', margin: 0 }}>
          Sign in or Create an account to see pricing
        </p>
        <Heart
          onClick={toggleLike}
          style={{
            marginLeft: '8px',
            cursor: 'pointer',
          }}
          fill={liked ? 'red' : 'transparent'}
          color={liked ? 'red' : 'gray'}
        />
      </div>
    </div>
  );
}
