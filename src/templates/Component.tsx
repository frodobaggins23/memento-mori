import { FC } from "react"
import styles from "./styles.module.scss"

interface Props {
  something: string
}

export const Component: FC<Props> = () => {
  return <div className={styles.foo}>Component</div>
}
