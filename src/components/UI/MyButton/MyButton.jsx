import styles from './MyButton.module.css';

export default function MyButton({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  ...props 
}) {
  const buttonClass = `${styles.button} ${styles[variant] || ''} ${className}`;

  return (
    <button 
      className={buttonClass} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}