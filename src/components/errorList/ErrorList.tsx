import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  errors: Array<string | null>
}

const hasAnyMessage = (errors: Array<string | null>) => {
  return errors.some((error) => error !== null)
}

export const ErrorList: FC<Props> = ({ errors }) => {
  if (!hasAnyMessage(errors)) {
    return null
  }
  return (
    <div className={styles.list}>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
