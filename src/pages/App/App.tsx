import { useState } from "react"
import { Boilerplate } from "@/components/boilerplate"
// import "./App.css"
import "./App.scss"

export const App = () => {
  const [count, setCount] = useState(0)
  const message = import.meta.env.VITE_MESSAGE ?? "Fill in .env.VITE_MESSAGE"

  return <Boilerplate count={count} setCount={setCount} message={message} />
}
