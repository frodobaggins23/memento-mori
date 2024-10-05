export type SettingsState = {
  dob: string | null
  name: string | null
  gender: string | null
}

export type ContextState = {
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

export type Scales = "small" | "medium" | "large"
