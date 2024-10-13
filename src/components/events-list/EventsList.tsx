import { FC, useContext } from "react"
import { getFormattedDate } from "@/utils"
import { Card } from "../card"
import styles from "./styles.module.scss"
import { EventsContext } from "@/context/EventsContext"

interface Props {
  showEvents: boolean
  handleClose: () => void
}

export const EventsList: FC<Props> = ({ showEvents, handleClose }) => {
  const { events } = useContext(EventsContext)

  if (!showEvents) return null

  return (
    <div className={styles.container}>
      <Card title="Events" handleClose={handleClose}>
        <ul className={styles.events}>
          {events.map((event) => (
            <li key={event.id}>
              <span>{getFormattedDate(event.date)}</span>
              <span> | </span>
              <span>{event.description}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
