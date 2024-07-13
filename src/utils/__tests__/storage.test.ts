import { describe, it, expect } from "vitest"
import { setStorage, getStorage } from "../storage"

describe("setStorage function", () => {
  it("serializes and stores a string value correctly", () => {
    const stringValue = "testString"
    setStorage("testKey", stringValue)
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify(stringValue))
  })

  it("serializes and stores a number value correctly", () => {
    const numberValue = 123
    setStorage("testKey", numberValue)
    expect(JSON.parse(localStorage.getItem("testKey") as string)).toBe(numberValue)
  })

  it("serializes and stores an object value correctly", () => {
    const objectValue = { key: "value" }
    setStorage("testKey", objectValue)
    expect(JSON.parse(localStorage.getItem("testKey") as string)).toEqual(objectValue)
  })
})

describe("getStorage", () => {
  it("should return null for non-existing key", () => {
    const result = getStorage("non-existing-key")
    expect(result).toBeNull()
  })

  it("should return the correct value for a string key", () => {
    localStorage.setItem("string-key", "Hello, World!")
    const result = getStorage("string-key")
    expect(result).toBe("Hello, World!")
  })

  it("should return the correct value for a number key", () => {
    localStorage.setItem("number-key", "123456")
    const result = getStorage("number-key")
    expect(result).toBe(123456)
  })

  it("should return the correct value for a JSON object key", () => {
    localStorage.setItem("json-key", JSON.stringify({ key: "value" }))
    const result = getStorage("json-key")
    expect(result).toEqual({ key: "value" })
  })

  it("should return the correct value for a JSON array key", () => {
    localStorage.setItem("array-key", JSON.stringify([1, 2, 3]))
    const result = getStorage("array-key")
    expect(result).toEqual([1, 2, 3])
  })
})
