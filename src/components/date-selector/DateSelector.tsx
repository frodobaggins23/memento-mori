import { FC } from "react"
import styles from "./styles.module.scss"

type Config = { fieldName: string; error: boolean; defaultValue: string }

type Validator = (value: HTMLInputElement["value"], fieldName: string) => void

interface Props {
  config: [Config, Config, Config]
  validateFn: Validator
}

export const DateSelector: FC<Props> = ({ config, validateFn }) => {
  return (
    <div className={styles.dob}>
      {config.map((field) => (
        <input
          key={field.fieldName}
          type="number"
          name={field.fieldName}
          data-error={field.error}
          onBlur={(e) => validateFn(e.currentTarget.value, field.fieldName)}
          defaultValue={field.defaultValue}
        />
      ))}
    </div>
  )
}
