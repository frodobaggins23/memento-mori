import { createContext } from "react"
import { FC, ReactNode } from "react"
import { EventsContextState } from "@/types"
import { useEvents } from "@/hooks/useEvents"

const defaultState: EventsContextState = {
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  getEventsForRange: () => [],
}

export const EventsContext = createContext(defaultState)

interface Props {
  children: ReactNode
}

export const EventsContextProvider: FC<Props> = ({ children }) => {
  const eventsProps = useEvents()

  return <EventsContext.Provider value={{ ...eventsProps }}>{children}</EventsContext.Provider>
}
