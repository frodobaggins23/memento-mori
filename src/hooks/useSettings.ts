import { useReducer } from "react"

type State = {
  dob: string
  name: string
  gender: string
}

type Action = {
  type: string
  key: string
  value: string
}

const MOCK_USER: State = {
  dob: "1987-01-23",
  name: "John Doe",
  gender: "male",
}

const settingsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE_SETTING":
      return {
        ...state,
        [action.key]: action.value,
      }
    default:
      return state
  }
}

export const useSettings = () => {
  const [state, dispatch] = useReducer(settingsReducer, MOCK_USER)

  const changeSetting = (key: string, value: string) => {
    dispatch({ type: "CHANGE_SETTING", key, value })
  }

  return { settings: state, changeSetting }
}
