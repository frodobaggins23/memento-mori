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
import { Form, Label } from "../form"
import styles from "./styles.module.scss"
import { EventsContext } from "@/context/EventsContext"
import { useFormValidation } from "@/hooks/useFormValidation"

interface Props {
  onSubmit: () => void
  defaultDate: string
}

const FORM_FIELDS = {
  description: "description",
  date_day: "date_day",
  date_month: "date_month",
  date_year: "date_year",
}

const formSchema = z.object({
  [FORM_FIELDS.description]: z.string().min(1, "Description is required").max(255, "Description can't be longer than 255 characters"),
  [FORM_FIELDS.date_day]: getDateDayValidationSchema(),
  [FORM_FIELDS.date_month]: getDateMonthValidationSchema(),
  [FORM_FIELDS.date_year]: getDateYearValidationSchema(),
})

export const AddEvent: FC<Props> = ({ onSubmit, defaultDate }) => {
  const { errors, validateField, validateForm } = useFormValidation(formSchema)
  const { addEvent } = useContext(EventsContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as Record<string, string>
    try {
      await validateForm(data)
      const eventDate = getDateStringFromDMYstrings(data[FORM_FIELDS.date_day], data[FORM_FIELDS.date_month], data[FORM_FIELDS.date_year])
      addEvent({ description: data[FORM_FIELDS.description], date: eventDate })
      onSubmit()
    } catch (e) {
      console.log("Form validation failed ...")
    }
  }

  const [defaultDay, defaultMonth, defaultYear] = getDMYfromDateString(defaultDate)

  return (
    <Form handleSubmit={handleSubmit}>
      <Label name="date">
        <DateSelector
          config={[
            { fieldName: FORM_FIELDS.date_day, error: !!errors[FORM_FIELDS.date_day], defaultValue: defaultDay },
            { fieldName: FORM_FIELDS.date_month, error: !!errors[FORM_FIELDS.date_month], defaultValue: defaultMonth },
            { fieldName: FORM_FIELDS.date_year, error: !!errors[FORM_FIELDS.date_year], defaultValue: defaultYear },
          ]}
          validateFn={(value, fieldName) => validateField(value, fieldName)}
        />
      </Label>
      <Label name="description">
        <textarea
          className={styles.description}
          rows={3}
          data-error={!!errors[FORM_FIELDS.description]}
          onBlur={(e) => validateField(e.currentTarget.value, FORM_FIELDS.description)}
          name={FORM_FIELDS.description}
        />
      </Label>
      <button type="submit">Add event</button>
    </Form>
  )
}
