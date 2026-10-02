import styles from './ParticipateForm.module.css'

/** Step 5: read-only summary of everything entered before final submit. */
export default function StepReview({ data }) {
  return (
    <div className={styles.review}>
      <dl>
        <dt>School</dt>
        <dd>{data.school}</dd>
        <dt>Sport</dt>
        <dd>{data.sport}</dd>
        <dt>Age Category</dt>
        <dd>{data.ageCategory}</dd>
        <dt>Gender</dt>
        <dd>{data.gender}</dd>
        <dt>Coach</dt>
        <dd>
          {data.coachName} · {data.coachMobile}
        </dd>
      </dl>

      <h4 className={styles.reviewPlayersTitle}>Squad ({data.players.length})</h4>
      <ul className={styles.reviewPlayers}>
        {data.players.map((player, i) => (
          <li key={i}>
            {player.name} <span>— {player.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
