import { FC } from "react"
import styles from "./styles.module.scss"
import settingsIcon from "@/assets/settings-ico.svg"

interface Props {
  handleClick: () => void
}

export const SettingsButton: FC<Props> = ({ handleClick }) => {
  return (
    <div className={styles.button} onClick={handleClick}>
      <img src={settingsIcon} alt="settings" />
    </div>
  )
}
