import { playerRoles } from '@/data/playerRoles'
import styles from './ParticipateForm.module.css'

/** One row in the dynamic player roster: name + role + remove button. */
export default function PlayerRow({ index, player, onChange, onRemove, canRemove, error }) {
  return (
    <div className={styles.playerRow}>
      <div className={styles.playerRowHead}>
        <span>Player {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={onRemove}
            aria-label={`Remove player ${index + 1}`}
          >
            ✕
          </button>
        )}
      </div>
      <div className={styles.playerRowFields}>
        <input
          type="text"
          placeholder="Player name"
          value={player.name}
          onChange={(e) => onChange({ ...player, name: e.target.value })}
          aria-label={`Player ${index + 1} name`}
        />
        <select
          value={player.role}
          onChange={(e) => onChange({ ...player, role: e.target.value })}
          aria-label={`Player ${index + 1} role`}
        >
          <option value="">Select role</option>
          {playerRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={styles.playerRowError}>{error}</p>}
    </div>
  )
}
