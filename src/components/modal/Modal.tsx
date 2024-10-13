import { FC } from "react"
import { Card } from "../card"
import styles from "./styles.module.scss"

interface Props {
  title: string
  visible: boolean
  handleClose: () => void
  children: React.ReactNode
  size: "small" | "large"
  closeOnClickOutside?: boolean
}

export const Modal: FC<Props> = ({ title, visible, handleClose, children, closeOnClickOutside = true, size }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnClickOutside) return
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${size === "small" && styles.small}`}>
        <Card title={title} handleClose={handleClose}>
          {children}
        </Card>
      </div>
    </div>
  )
}
