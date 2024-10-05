import { createContext, useMemo } from "react"
import { FC, ReactNode } from "react"
import { ContextState } from "@/types"
import { calculateWeeksFromDob, calculateWeeksToGo } from "@/utils"
import { useScale } from "@/hooks/useScale"
import { useSettings } from "@/hooks/useSettings"

const defaultState: ContextState = {
  settings: {
    dob: "",
    name: "",
    gender: "",
  },
  weekCount: {
    current: 0,
    toGo: 0,
  },
  scale: "small",
  changeSetting: () => {},
  setSettings: () => {},
  nextScale: () => {},
}

export const AppContext = createContext(defaultState)

interface Props {
  children: ReactNode
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const { scale, nextScale } = useScale()
  const { settings, changeSetting, setSettings } = useSettings()

  const weekCount = useMemo(() => {
    if (!settings.dob) {
      return 0
    }
    return calculateWeeksFromDob(settings.dob)
  }, [settings.dob])

  const weeksToGo = useMemo(() => {
    return calculateWeeksToGo(weekCount)
  }, [weekCount])

  return (
    <AppContext.Provider
      value={{
        settings,
        weekCount: {
          current: weekCount,
          toGo: weeksToGo,
        },
        scale,
        changeSetting,
        nextScale,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
