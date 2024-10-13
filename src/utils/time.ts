const AVERAGE_LIFE_EXPECTANCY_YEARS = 79
const WEEKS_IN_YEAR = 365.25 / 7 // including leap years
const WEEKS_IN_LIFE = AVERAGE_LIFE_EXPECTANCY_YEARS * WEEKS_IN_YEAR

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

export const calculateWeeksFromDob = (dob: string): number => {
  const dobDate = new Date(dob)
  const currentDate = new Date()
  const diffTime = currentDate.getTime() - dobDate.getTime()

  if (diffTime < 0) return 0

  const diffDays = Math.ceil(diffTime / DAY_IN_MILLISECONDS)
  return Math.floor(diffDays / 7)
}

export const calculateWeeksToGo = (currentWeekCount: number): number => {
  return WEEKS_IN_LIFE - currentWeekCount
}

export const calculateDatesFromWeekCount = (dob: string, currentWeekCount: number): { startDate: string; endDate: string } => {
  const dobDate = new Date(dob)
  const startDate = new Date(dobDate.getTime() + currentWeekCount * 7 * DAY_IN_MILLISECONDS)
  const endDate = new Date(startDate.getTime() + 6 * DAY_IN_MILLISECONDS)
  return { startDate: startDate.toDateString(), endDate: endDate.toDateString() }
}

export const getDateStringFromDMYstrings = (day: string, month: string, year: string): string => {
  const date = new Date(`${year}-${month}-${day}`)
  return date.toDateString()
}

export const getDMYfromDateString = (dateString: string | null): string[] => {
  if (!dateString) return ["", "", ""]
  const date = new Date(dateString)
  return [date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString()]
}

export const getFormattedDate = (dateValue: string | Date): string => {
  let date
  if (typeof dateValue === "string") {
    date = new Date(dateValue)
  } else {
    date = dateValue
  }
  return date.toLocaleDateString("cs-CZ")
}

export const sortDateStrings = (a: string, b: string) => {
  return new Date(a).getTime() - new Date(b).getTime()
}
