import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form: FC<Props> = ({ children, handleSubmit }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
