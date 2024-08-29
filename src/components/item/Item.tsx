import { FC } from "react"
import { Scales } from "@/types"
import styles from "./styles.module.scss"

interface Props {
  orderNumber: number
  startDate: string
  endDate: string
  note: string
  active: boolean
  scale: Scales
}

export const Item: FC<Props> = ({ scale = "small", active = false }) => {
  return (
    <div className={`${styles.item} ${active && styles.active} ${styles[scale]}`}>
      {/* <div className="item__order-number">{orderNumber}</div> */}
      {/* <div className="item__start-date">{startDate}</div>
      <div className="item__end-date">{endDate}</div>
      <div className="item__note">{note}</div> */}
    </div>
  )
}
