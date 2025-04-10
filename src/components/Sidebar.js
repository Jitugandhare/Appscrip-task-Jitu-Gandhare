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
