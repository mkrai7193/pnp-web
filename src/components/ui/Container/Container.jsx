import styles from './Container.module.css'

/** Centers content and caps its width — the layout unit every section wraps its content in. */
export default function Container({ as: Tag = 'div', className = '', children }) {
  const classes = className ? `${styles.container} ${className}` : styles.container
  return <Tag className={classes}>{children}</Tag>
}
