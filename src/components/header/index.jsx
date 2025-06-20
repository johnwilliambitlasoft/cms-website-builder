'use client'
import styles from './header.module.css';
const Header = ({
  Children = null
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <label className={styles.TextLogo}>WB</label>
      </div>
      <div className={styles.deviceActionContainer}>
        <div className={"panel__devices"}></div>
      </div>
      <div className={styles.rightActionContainer}>
        <div className={"panel__history"}></div>
      </div>
    </div>
  )
}

export default Header