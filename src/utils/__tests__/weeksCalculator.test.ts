import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { calculateWeeksFromDob } from "../weeksCalculator"

describe("calculateWeeksFromDob", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it("should calculate the correct number of weeks for a given date of birth", () => {
    vi.setSystemTime(new Date("2024-03-01"))
    const dob1 = "2024-01-31"
    const dob2 = "2024-02-03"
    const dob3 = "2024-02-05"
    const dob4 = "2024-02-09"
    const dob5 = "2024-02-10"
    expect(calculateWeeksFromDob(dob1)).toBe(4)
    expect(calculateWeeksFromDob(dob2)).toBe(3)
    expect(calculateWeeksFromDob(dob3)).toBe(3)
    expect(calculateWeeksFromDob(dob4)).toBe(3)
    expect(calculateWeeksFromDob(dob5)).toBe(2)
  })

  it("should return 0 weeks for today's date", () => {
    const today = new Date().toISOString().split("T")[0]
    expect(calculateWeeksFromDob(today)).toBe(0)
  })

  it("should handle leap years correctly", () => {
    vi.useFakeTimers()
    const dob = "2024-02-29"
    const mockedTodayDate = new Date("2024-03-10")
    vi.setSystemTime(mockedTodayDate)
    expect(calculateWeeksFromDob(dob)).toBe(1)
    vi.useRealTimers()
  })

  it("should handle future dates correctly", () => {
    const futureDate = "3000-01-01"
    expect(calculateWeeksFromDob(futureDate)).toBe(0)
  })
})
