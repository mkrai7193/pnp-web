import Modal from '@/components/ui/Modal'
import styles from './FormShell.module.css'

/**
 * Card wrapper shared by every onboarding/participation form: title,
 * the `<form>` itself (fields passed as children), a submit-error line,
 * and the submit button. Each form owns its own field state/validation
 * and just plugs into `onSubmit` / `success` / `error`. On success, the
 * message pops up as a modal (see `ui/Modal`) rather than an inline
 * banner — `onCloseSuccess` is called when it's dismissed (Escape,
 * clicking outside, or the close button); pass it through to whatever
 * resets the parent's `success` state.
 */
export default function FormShell({
  title,
  description,
  onSubmit,
  submitLabel = 'Submit',
  submitting = false,
  success,
  successMessage,
  onCloseSuccess,
  error,
  children,
  footer,
}) {
  return (
    <div className={styles.card}>
      {title && <h3>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}

      <form onSubmit={onSubmit} noValidate>
        {children}

        {error && (
          <p className={styles.formError} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? 'Submitting…' : submitLabel}
        </button>

        {footer}
      </form>

      <Modal open={Boolean(success)} onClose={onCloseSuccess} title="Almost there!">
        {successMessage}
      </Modal>
    </div>
  )
}
