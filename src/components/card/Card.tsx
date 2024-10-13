import { FC, ReactNode } from "react"
import styles from "./styles.module.scss"

interface Props {
  title: string
  children: ReactNode
  handleClose?: () => void
}

export const Card: FC<Props> = ({ title, children, handleClose }) => {
  const withClose = !!handleClose

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <p className={styles.title}>{title}</p>
        {withClose && <button onClick={handleClose} className={styles.closeBtn} />}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
