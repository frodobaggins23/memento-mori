import { FC } from "react"
import { Scales } from "@/types"
import styles from "./styles.module.scss"

interface Props {
  children: React.ReactNode
  scale: Scales
}

export const ItemGrid: FC<Props> = ({ children, scale = "small" }) => {
  return <div className={`${styles.itemGrid} ${styles[scale]}`}>{children}</div>
}
