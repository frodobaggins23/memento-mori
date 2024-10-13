import { z } from "zod"

export const getDateDayValidationSchema = () =>
  z
    .string()
    .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day")
    .min(1, "Day is required")

export const getDateMonthValidationSchema = () =>
  z
    .string()
    .regex(/^(0?[1-9]|1[012])$/, "Invalid month")
    .min(1, "Month is required")

export const getDateYearValidationSchema = () =>
  z
    .string()
    .min(1, "Year is required")
    .refine((year) => {
      if (!year) return true
      const currentYear = new Date().getFullYear()
      return parseInt(year) >= 1920 && parseInt(year) <= currentYear
    }, "Year should be between 1920 and the current year")
