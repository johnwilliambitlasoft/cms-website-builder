import React from 'react'
import styles from './loader.module.css'

/**
 * Spinner Loader Component
 * 
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size - Size of spinner (small, medium, large)
 * @param {boolean} props.overlay - Whether to show as a full-screen overlay
 * @param {string} props.text - Optional text to show below spinner
 * @param {string} props.color - Optional custom color for the spinner (defaults to var(--green) CSS variable)
 * @returns {JSX.Element} Spinner component
 */
const Loader = ({ 
  size = 'md', 
  overlay = false, 
  text = '', 
  color = 'var(--green)'
}) => {
  // Get the appropriate size class
  const sizeClass = size === 'sm' 
    ? styles.spinnerSm 
    : size === 'lg' 
      ? styles.spinnerLg 
      : styles.spinnerMd;
  
  // Create the spinner element
  const spinner = (
    <div className={styles.spinnerContainer}>
      <div 
        className={`${styles.spinner} ${sizeClass}`}
        style={{ borderLeftColor: color }}
      />
      {text && <div className={styles.spinnerText}>{text}</div>}
    </div>
  );
  
  // If overlay is true, wrap in an overlay container
  if (overlay) {
    return (
      <div className={styles.spinnerOverlay}>
        {spinner}
      </div>
    );
  }
  
  // Otherwise return just the spinner
  return spinner;
}

export default Loader