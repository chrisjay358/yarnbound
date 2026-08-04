import styles from './Logo.module.css';

function Logo() {
  return (
    <a href="#top" className={styles.logoBox}>
      <svg
        className={styles.logoMark}
        viewBox="0 0 120 120"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="3"
          y="3"
          width="114"
          height="114"
          rx="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M36 32 L60 56 L84 32" />
          <path d="M60 56 L60 74" />
        </g>
        <path d="M50 74 H70 V98 L60 90.5 L50 98 Z" fill="currentColor" />
      </svg>
      <span className={styles.logoText}>Yarnbound</span>
    </a>
  );
}

export default Logo;
