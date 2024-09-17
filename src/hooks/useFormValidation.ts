import { useState } from "react"
import { AnyZodObject, ZodError, ZodIssue } from "zod"

type Message = string | null

type Errors = {
  [field: string]: Message
}

const getFieldsFromSchema = (schema: AnyZodObject) => {
  return Object.keys(schema.shape)
}

const getInitialErrors = (schema: AnyZodObject) => {
  return getFieldsFromSchema(schema).reduce((acc: Errors, field: string) => {
    acc[field] = null
    return acc
  }, {})
}

const getMessagesFromZodError = (e: ZodError): Errors => {
  return e.errors.reduce((acc: Errors, error: ZodIssue) => {
    acc[error.path[0]] = error.message
    return acc
  }, {})
}

export const useFormValidation = (formSchema: AnyZodObject) => {
  const [errors, setErrors] = useState<Errors>(getInitialErrors(formSchema))

  const validateForm = async (data: unknown) => {
    try {
      formSchema.parse(data)
      setErrors({})
      return Promise.resolve()
    } catch (e) {
      const error = e as ZodError
      setErrors(() => getMessagesFromZodError(error))
      return Promise.reject()
    }
  }

  const validateField = (value: unknown, field: string) => {
    try {
      formSchema.pick({ [field]: true }).parse({ [field]: value })
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }))
    } catch (e: unknown) {
      const error = e as ZodError
      setErrors((prevErrors: Errors) => ({
        ...prevErrors,
        [field]: error.errors[0].message,
      }))
    }
  }

  return { validateForm, validateField, errors }
}
