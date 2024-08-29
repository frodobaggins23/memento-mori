import { FC } from "react"
import { Scales } from "@/types"
import styles from "./styles.module.scss"

interface Props {
  scale: Scales
  handleClick: () => void
}

const LABELS: Record<Scales, string> = {
  small: "S",
  medium: "M",
  large: "L",
}

export const ScaleButton: FC<Props> = ({ scale, handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {LABELS[scale]}
    </button>
  )
}
