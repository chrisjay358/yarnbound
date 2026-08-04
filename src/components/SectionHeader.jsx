import styles from './SectionHeader.module.css';

function SectionHeader({ id, tag, heading, description }) {
  return (
    <header className={styles.header}>
      {/* The tag is a decorative label above the heading. aria-hidden so it isn't
          announced right before the <h2>. */}

      <span className={styles.tag} aria-hidden="true">
        {tag}
      </span>
      <h2 id={id} className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.description}>{description}</p>
    </header>
  );
}

export default SectionHeader;
