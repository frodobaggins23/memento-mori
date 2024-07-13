import { FC } from "react"
import styles from "./Boilerplate.module.scss"
import reactLogo from "@/assets/react.svg"
import viteLogo from "/vite.svg"

interface Props {
  count: number
  setCount: (setter: (count: number) => number) => void
  message: string
}
export const Boilerplate: FC<Props> = ({ count, setCount, message }) => (
  <>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className={`${styles.logo} react`} alt="React logo" />
      </a>
    </div>
    <h1>Vite + React</h1>
    <div className={styles.card}>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
    <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    <p> This is special message: {message}</p>
  </>
)
