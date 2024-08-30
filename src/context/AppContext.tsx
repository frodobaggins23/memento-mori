import { createContext, useMemo } from "react"
import { FC, ReactNode } from "react"
import { ContextState } from "@/types"
import { useScale } from "@/hooks/useScale"
import { useSettings } from "@/hooks/useSettings"
import { calculateWeeksFromDob, calculateWeeksToGo } from "@/utils/weeksCalculator"

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
  nextScale: () => {},
}

export const AppContext = createContext(defaultState)

interface Props {
  children: ReactNode
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const { scale, nextScale } = useScale()
  const { settings, changeSetting } = useSettings()

  const weekCount = useMemo(() => {
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
