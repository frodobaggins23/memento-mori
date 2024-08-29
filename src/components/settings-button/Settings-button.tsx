import { FC } from "react"
import styles from "./styles.module.scss"
import settingsIcon from "@/assets/settings-ico.svg"

export const SettingsButton: FC = () => {
  return (
    <div className={styles.button}>
      <img src={settingsIcon} alt="settings" />
    </div>
  )
}
