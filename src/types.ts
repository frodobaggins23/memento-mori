export type ContextState = {
  settings: {
    dob: string
    name: string
    gender: string
  }
  weekCount: {
    current: number
    toGo: number
  }
  changeSetting: (key: string, value: string) => void
  scale: Scales
  nextScale: () => void
}

export type Scales = "small" | "medium" | "large"
