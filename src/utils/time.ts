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

export const calculateWeekFromCount = (dob: string, currentWeekCount: number): string => {
  const dobDate = new Date(dob)
  const targetWeek = new Date(dobDate.getTime() + currentWeekCount * 7 * DAY_IN_MILLISECONDS)
  return targetWeek.toDateString()
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
