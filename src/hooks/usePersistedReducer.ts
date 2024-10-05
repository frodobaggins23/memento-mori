import { useCallback, useReducer } from "react"
import { getStorage, setStorage } from "@/utils"

const init = (storageKey: string, initialState: unknown) => {
  const persisted = getStorage(storageKey)
  if (persisted) {
    try {
      return JSON.parse(persisted)
    } catch (e) {
      console.error(e)
      return initialState
    }
  } else {
    setStorage(storageKey, JSON.stringify(initialState))
    return initialState
  }
}

export const usePersistedReducer = <S, A>(reducer: (state: S, action: A) => S, initialState: S, storageKey: string) => {
  const persistedReducer = useCallback(
    (state: S, action: A) => {
      const nextState = reducer(state, action)
      try {
        setStorage(storageKey, JSON.stringify(nextState))
      } catch (e) {
        console.error(e)
      }
      return nextState
    },
    [reducer, storageKey]
  )

  return useReducer(persistedReducer, initialState, (initial) => init(storageKey, initial))
}
