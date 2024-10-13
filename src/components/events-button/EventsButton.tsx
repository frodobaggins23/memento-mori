import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  handleOnClick: () => void
}

export const EventsButton: FC<Props> = ({ handleOnClick }) => {
  return (
    <div className={styles.button} onClick={handleOnClick}>
      E
    </div>
  )
}
