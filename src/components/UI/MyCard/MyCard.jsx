import styles from './MyCard.module.css';

export default function MyCard({ 
  children, 
  className = '', 
  onClick,
  ...props 
}) {
  return (
    <div 
      className={`${styles.card} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}