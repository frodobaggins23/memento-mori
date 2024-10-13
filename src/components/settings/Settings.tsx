import { FC, useContext } from "react"
import { z } from "zod"
import {
  getDateDayValidationSchema,
  getDateMonthValidationSchema,
  getDateStringFromDMYstrings,
  getDateYearValidationSchema,
  getDMYfromDateString,
} from "@/utils"
import { DateSelector } from "../date-selector"
import { ErrorList } from "../errorList"
import { Form, Label } from "../form"
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
  [FORM_FIELDS.dob_day]: getDateDayValidationSchema(),
  [FORM_FIELDS.dob_month]: getDateMonthValidationSchema(),
  [FORM_FIELDS.dob_year]: getDateYearValidationSchema(),
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
      <Form handleSubmit={handleSubmit}>
        <Label name="name">
          <input
            type="text"
            name={FORM_FIELDS.name}
            data-error={!!errors[FORM_FIELDS.name]}
            onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.name)}
            defaultValue={settings.name ?? ""}
          />
        </Label>
        <Label name="date of birth">
          <div className={styles.dob}>
            <DateSelector
              config={[
                { fieldName: FORM_FIELDS.dob_day, error: !!errors[FORM_FIELDS.dob_day], defaultValue: dob_date },
                { fieldName: FORM_FIELDS.dob_month, error: !!errors[FORM_FIELDS.dob_month], defaultValue: dob_month },
                { fieldName: FORM_FIELDS.dob_year, error: !!errors[FORM_FIELDS.dob_year], defaultValue: dob_year },
              ]}
              validateFn={(value, fieldName) => validateField(value, fieldName)}
            />
          </div>
        </Label>
        <Label name="gender">
          <select name={FORM_FIELDS.gender} data-error={!!errors[FORM_FIELDS.gender]} defaultValue={settings.gender ?? ""}>
            <option label="male" value="male" />
            <option label="female" value="female" />
          </select>
        </Label>
        <button type="submit">Save</button>
      </Form>
      <ErrorList errors={Object.values(errors).filter(Boolean)} />
    </div>
  )
}
