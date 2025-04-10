import styles from '../styles/Home.module.css';

export default function SortMenu({ setSort }) {
  return (
    <div className={styles.sortMenu}>
      {/* <label htmlFor="sort"></label> */}
      <select id="sort" onChange={(e) => setSort(e.target.value)}>
       
        <option value="recommended">Recommended</option>
        <option value="newest">Newest First</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>

      </select>
    </div>
  );
}
