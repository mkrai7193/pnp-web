import PlayerRow from './PlayerRow'
import styles from './ParticipateForm.module.css'

const EMPTY_PLAYER = { name: '', role: '' }

/** Step 3: build the squad — add/remove players, each with a role. */
export default function StepPlayers({ data, update, errors }) {
  const setPlayers = (players) => update({ players })

  const changePlayer = (index, player) => {
    const players = [...data.players]
    players[index] = player
    setPlayers(players)
  }

  const addPlayer = () => setPlayers([...data.players, { ...EMPTY_PLAYER }])

  const removePlayer = (index) => setPlayers(data.players.filter((_, i) => i !== index))

  return (
    <div>
      {data.players.map((player, i) => (
        <PlayerRow
          key={i}
          index={i}
          player={player}
          onChange={(p) => changePlayer(i, p)}
          onRemove={() => removePlayer(i)}
          canRemove={data.players.length > 1}
          error={errors.players?.[i]}
        />
      ))}

      <button type="button" className={styles.addPlayerBtn} onClick={addPlayer}>
        + Add Player
      </button>
    </div>
  )
}
