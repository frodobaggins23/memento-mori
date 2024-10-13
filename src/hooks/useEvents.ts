import { generateRandomId, sortDateStrings } from "@/utils"
import { usePersistedReducer } from "./usePersistedReducer"

interface Event {
  description: string
  date: string
}

export interface SavedEvent extends Event {
  id: string
}

const ACTIONS = {
  ADD_EVENT: "ADD_EVENT",
  REMOVE_EVENT: "REMOVE_EVENT",
}

const REDUCER_KEY = "events"

const defaultState: SavedEvent[] = []

const eventsReducer = (state: SavedEvent[], action: { type: string; value: Event | string }) => {
  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      return [...state, { ...(action.value as Event), id: generateRandomId() }].sort((a, b) => sortDateStrings(a.date, b.date))
    case ACTIONS.REMOVE_EVENT:
      return state.filter((event) => event.id !== action.value)
    default:
      return state
  }
}

export const useEvents = () => {
  const [state, dispatch] = usePersistedReducer(eventsReducer, defaultState, REDUCER_KEY)

  const addEvent = (event: Event) => {
    dispatch({ type: ACTIONS.ADD_EVENT, value: event })
  }

  const removeEvent = (id: string) => {
    dispatch({ type: ACTIONS.REMOVE_EVENT, value: id })
  }

  const getEventsForRange = (start: string, end: string) => {
    const startDate = new Date(start).getTime()
    const endDate = new Date(end).getTime()
    return state.filter((event) => {
      const eventDate = new Date(new Date(event.date).toDateString()).getTime()
      return eventDate >= startDate && eventDate <= endDate
    })
  }

  return { events: state, addEvent, removeEvent, getEventsForRange }
}
