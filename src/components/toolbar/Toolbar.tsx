import { FC, ReactNode } from "react"
import styles from "./styles.module.scss"

interface Props {
  children: ReactNode
}

export const Toolbar: FC<Props> = ({ children }) => {
  return <div className={styles.toolbar}>{children}</div>
}
