import { FC, useContext, memo } from "react"
import { Scales } from "@/types"
import { calculateDatesFromWeekCount, getFormattedDate } from "@/utils"
import { AddEvent } from "../add-event"
import { Modal } from "../modal"
import { Tooltip } from "../tooltip"
import styles from "./styles.module.scss"
import { EventsContext } from "@/context/EventsContext"
import { useOpen } from "@/hooks/useOpen"

export interface Props {
  orderNumber: number
  active: boolean
  scale: Scales
  dob: string
}

const ItemComponent: FC<Props> = ({ scale = "small", active = false, orderNumber, dob }) => {
  const { getEventsForRange } = useContext(EventsContext)
  const [visible, setVisibility] = useOpen(false)
  const { startDate, endDate } = calculateDatesFromWeekCount(dob, orderNumber)
  const itemEvents = getEventsForRange(startDate, endDate)
  const hasEvents = itemEvents.length > 0
  const tooltipText = `${getFormattedDate(startDate)} - ${getFormattedDate(endDate)} (${itemEvents.length} events)`

  return (
    <>
      <Tooltip text={tooltipText}>
        <div
          className={`${styles.item} ${!hasEvents && active && styles.active} ${hasEvents && styles.eventful} ${styles[scale]}`}
          onClick={setVisibility.open}
        />
      </Tooltip>
      <Modal visible={visible} handleClose={setVisibility.close} size="small" title="Add event">
        <AddEvent onSubmit={setVisibility.close} defaultDate={startDate} />
      </Modal>
    </>
  )
}

export const Item = memo(ItemComponent)
