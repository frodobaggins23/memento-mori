import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  visible: boolean
  handleClose: () => void
  children: React.ReactNode
}

export const Modal: FC<Props> = ({ visible, handleClose, children }) => {
  if (!visible) return null
  return (
    <div className={styles.modal}>
      <button className={styles.modalCloseButton} onClick={handleClose}>
        <div className={styles.modalClose} />
      </button>
      {children}
    </div>
  )
}
