import { SavedEvent } from "./hooks/useEvents"

export type SettingsState = {
  dob: string | null
  name: string | null
  gender: string | null
}

export type AppContextState = {
  settings: {
    dob: string | null
    name: string | null
    gender: string | null
  }
  weekCount: {
    current: number
    toGo: number
  }
  changeSetting: (key: string, value: string) => void
  setSettings: (state: SettingsState) => void
  scale: Scales
  nextScale: () => void
}

export type EventsContextState = {
  events: SavedEvent[]
  addEvent: (event: Omit<SavedEvent, "id">) => void
  removeEvent: (id: string) => void
  getEventsForRange: (start: string, end: string) => SavedEvent[]
}

export type Scales = "small" | "medium" | "large"
