import { FC, useContext, memo } from "react"
import { Scales } from "@/types"
import { calculateWeekFromCount } from "@/utils"
import { Tooltip } from "../tooltip"
import styles from "./styles.module.scss"
import { AppContext } from "@/context/AppContext"

interface Props {
  orderNumber: number
  active: boolean
  scale: Scales
}

const ItemComponent: FC<Props> = ({ scale = "small", active = false, orderNumber }) => {
  const { settings } = useContext(AppContext)
  const targetWeek = settings.dob ? calculateWeekFromCount(settings.dob, orderNumber) : 0
  return (
    <Tooltip text={targetWeek}>
      <div className={`${styles.item} ${active && styles.active} ${styles[scale]}`} />
    </Tooltip>
  )
}

export const Item = memo(ItemComponent)
