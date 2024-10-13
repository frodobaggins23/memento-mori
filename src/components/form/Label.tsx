import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
  name: string
}

export const Label: FC<Props> = ({ children, name }) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <label className={styles.label}>
      <span>{nameCapitalized}:</span>
      {children}
    </label>
  )
}
