import { sanitizeMobileInput } from '@/utils/validators'
import styles from './FormField.module.css'

/**
 * Labeled form control (input/select/textarea) with an optional error line.
 * Shared by every onboarding/participation form. For a `select`, pass
 * `options` as an array of strings or `{ value, label }` objects.
 *
 * `type="tel"` fields are sanitized as the user types (letters/symbols are
 * stripped, value capped at 10 digits) via `sanitizeMobileInput` — every
 * mobile number field in the app goes through this one component, so the
 * behavior only needs to live here.
 */
export default function FormField({
  as = 'input',
  type = 'text',
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options,
  hint,
  ...rest
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  const handleChange = (e) => {
    if (type === 'tel') {
      e.target.value = sanitizeMobileInput(e.target.value)
    }
    onChange(e)
  }

  return (
    <div className={styles.group}>
      <label htmlFor={id}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      {as === 'select' ? (
        <select id={id} value={value} onChange={onChange} aria-describedby={describedBy} {...rest}>
          {options.map((opt) => {
            const optValue = typeof opt === 'string' ? opt : opt.value
            const optLabel = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            )
          })}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={describedBy}
          inputMode={type === 'tel' ? 'numeric' : undefined}
          {...rest}
        />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
