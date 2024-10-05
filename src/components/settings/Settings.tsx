import { FC, useContext } from "react"
import { z } from "zod"
import { getDateStringFromDMYstrings, getDMYfromDateString } from "@/utils"
import { ErrorList } from "../errorList"
import styles from "./styles.module.scss"
import { AppContext } from "@/context/AppContext"
import { useFormValidation } from "@/hooks/useFormValidation"

interface Props {
  onModalSubmit: () => void
}

const FORM_FIELDS = {
  name: "name",
  dob_day: "dob_day",
  dob_month: "dob_month",
  dob_year: "dob_year",
  gender: "gender",
}

const formSchema = z.object({
  [FORM_FIELDS.name]: z.string().min(1, "Name is required").max(50, "Name can't be longer than 50 characters"),
  [FORM_FIELDS.dob_day]: z
    .string()
    .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day of birth")
    .min(1, "Day of birth is required"),
  [FORM_FIELDS.dob_month]: z
    .string()
    .regex(/^(0?[1-9]|1[012])$/, "Invalid month of birth")
    .min(1, "Month of birth is required"),
  [FORM_FIELDS.dob_year]: z
    .string()
    .min(1, "Year of birth is required")
    .refine((year) => {
      if (!year) return true
      const currentYear = new Date().getFullYear()
      return parseInt(year) >= 1920 && parseInt(year) <= currentYear
    }, "Year of birth should be between 1920 and the current year"),
  [FORM_FIELDS.gender]: z.string().min(1, "Gender is required"),
})

export const Settings: FC<Props> = ({ onModalSubmit }) => {
  const { errors, validateField, validateForm } = useFormValidation(formSchema)
  const { setSettings, settings } = useContext(AppContext)
  const [dob_date, dob_month, dob_year] = getDMYfromDateString(settings.dob)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as Record<string, string>
    try {
      await validateForm(data)
      const dob = getDateStringFromDMYstrings(data[FORM_FIELDS.dob_day], data[FORM_FIELDS.dob_month], data[FORM_FIELDS.dob_year])
      setSettings({
        name: data[FORM_FIELDS.name],
        dob,
        gender: data[FORM_FIELDS.gender],
      })
      onModalSubmit()
    } catch (e) {
      console.log("Form validation failed ...")
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span>Name:</span>
          <input
            type="text"
            name={FORM_FIELDS.name}
            data-error={!!errors[FORM_FIELDS.name]}
            onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.name)}
            defaultValue={settings.name ?? ""}
          />
        </label>
        <label className={styles.label}>
          <span>Date of birth:</span>
          <div className={styles.dob}>
            <input
              type="number"
              name={FORM_FIELDS.dob_day}
              data-error={!!errors[FORM_FIELDS.dob_day]}
              onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.dob_day)}
              defaultValue={dob_date}
            />
            <input
              type="number"
              name={FORM_FIELDS.dob_month}
              data-error={!!errors[FORM_FIELDS.dob_month]}
              onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.dob_month)}
              defaultValue={dob_month}
            />
            <input
              type="number"
              name={FORM_FIELDS.dob_year}
              data-error={!!errors[FORM_FIELDS.dob_year]}
              onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.dob_year)}
              defaultValue={dob_year}
            />
          </div>
        </label>
        <label className={styles.label}>
          <span>Gender:</span>
          <select name={FORM_FIELDS.gender} data-error={!!errors[FORM_FIELDS.gender]} defaultValue={settings.gender ?? ""}>
            <option label="male" value="male" />
            <option label="female" value="female" />
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
      <ErrorList errors={Object.values(errors).filter(Boolean)} />
    </div>
  )
}
