import { SettingsState } from "@/types"
import { usePersistedReducer } from "./usePersistedReducer"

type Action = {
  type: string
  key?: string
  value: string | SettingsState
}

const ACTIONS = {
  CHANGE_SETTING: "CHANGE_SETTING",
  SET_SETTINGS: "SET_SETTINGS",
}

const defaultState: SettingsState = {
  dob: null,
  name: null,
  gender: null,
}

const settingsReducer = (state: SettingsState, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_SETTING:
      return {
        ...state,
        [action.key!]: action.value as string,
      }
    case ACTIONS.SET_SETTINGS:
      return {
        ...(action.value as SettingsState),
      }
    default:
      return state
  }
}

export const useSettings = () => {
  const [state, dispatch] = usePersistedReducer(settingsReducer, defaultState, "REDUCER")

  const changeSetting = (key: string, value: string) => {
    dispatch({ type: ACTIONS.CHANGE_SETTING, key, value })
  }

  const setSettings = (settings: SettingsState) => {
    dispatch({ type: ACTIONS.SET_SETTINGS, value: settings })
  }

  return { settings: state, changeSetting, setSettings }
}
