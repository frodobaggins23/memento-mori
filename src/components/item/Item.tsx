import { FC, useContext } from "react"
import { Scales } from "@/types"
import { Tooltip } from "../tooltip"
import styles from "./styles.module.scss"
import { AppContext } from "@/context/AppContext"
import { calculateWeekFromCount } from "@/utils/weeksCalculator"

interface Props {
  orderNumber: number
  startDate: string
  endDate: string
  note: string
  active: boolean
  scale: Scales
}

export const Item: FC<Props> = ({ scale = "small", active = false, orderNumber }) => {
  const { settings } = useContext(AppContext)
  const targetWeek = calculateWeekFromCount(settings.dob, orderNumber)
  return (
    <Tooltip text={targetWeek}>
      <div className={`${styles.item} ${active && styles.active} ${styles[scale]}`} />
    </Tooltip>
  )
}
