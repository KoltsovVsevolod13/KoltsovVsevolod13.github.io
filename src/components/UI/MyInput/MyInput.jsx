import styles from './MyInput.module.css';

export default function MyInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  ...props
}) {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={styles.input}
        {...props}
      />
    </div>
  );
}