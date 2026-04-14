import styles from './MySelect.module.css';

export default function MySelect({
  label,
  value,
  onChange,
  options,
  ...props
}) {
  return (
    <div className={styles.selectGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <select 
        value={value} 
        onChange={onChange}
        className={styles.select}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}