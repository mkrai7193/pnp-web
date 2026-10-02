import { phoneScore } from '@/data/phoneScore'
import logo from '@/assets/logo.png'
import Ball from './Ball'
import styles from './PhoneMockup.module.css'

/** A hand-built phone frame showing a live cricket scorecard, purely decorative. */
export default function PhoneMockup() {
  const { matchTitle, teamA, teamB, lastBalls, crr, batsman, bowler, navItems } = phoneScore

  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <div className={styles.phone}>
        <div className={styles.notch} />
        <div className={styles.screen}>
          <div className={styles.hdr}>
            <img src={logo} alt="" aria-hidden="true" className={styles.hdrLogo} />
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              LIVE
            </div>
          </div>

          <div className={styles.matchTitle}>{matchTitle}</div>

          <div className={styles.teams}>
            <div className={styles.teamRow}>
              <div>
                <div className={styles.teamName}>{teamA.name}</div>
                <div className={styles.teamNote}>{teamA.note}</div>
              </div>
              <div className={styles.teamRight}>
                <div className={styles.teamScore}>{teamA.score}</div>
                <div className={styles.overs}>{teamA.overs}</div>
              </div>
            </div>
            <div className={styles.vs}>VS</div>
            <div className={styles.teamRow}>
              <div>
                <div className={styles.teamName}>{teamB.name}</div>
                <div className={styles.teamNote}>{teamB.note}</div>
              </div>
              <div className={styles.teamRight}>
                <div className={styles.teamScoreMuted}>{teamB.score}</div>
              </div>
            </div>
          </div>

          <div className={styles.ballsSection}>
            <div className={styles.ballsLabel}>Last 6 balls</div>
            <div className={styles.balls}>
              {lastBalls.map((ball, i) => (
                <Ball key={i} {...ball} />
              ))}
            </div>
          </div>

          <div className={styles.crr}>
            <div className={styles.crrItem}>
              <span className={styles.crrVal}>{crr}</span>CRR
            </div>
            <div className={styles.crrItem}>
              <span className={styles.crrVal}>{batsman.runs}</span>Runs ({batsman.name})
            </div>
            <div className={styles.crrItem}>
              <span className={styles.crrVal}>{bowler.figures}</span>
              {bowler.name}
            </div>
          </div>

          <div className={styles.navBar}>
            {navItems.map((item) => (
              <div key={item.label} className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}>
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
