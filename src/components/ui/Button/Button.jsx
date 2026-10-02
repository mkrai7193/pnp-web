import { Link } from 'react-router-dom'
import styles from './Button.module.css'

const VARIANTS = {
  primary: styles.primary,
  blue: styles.blue,
  outline: styles.outline,
  gold: styles.gold,
}

/**
 * Renders as a router <Link> when `to` is given, a plain <a> when `href` is
 * given (used for the in-page `#section` anchors), or a <button> otherwise.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.btn, VARIANTS[variant] ?? VARIANTS.primary, className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
