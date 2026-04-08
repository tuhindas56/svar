import { describe, expect, it } from "vitest"
import { addAt, getInitials } from "./utils"

describe("addAt", () => {
  it("adds an item at the start of an array", () => {
    const arr = [2, 3, 4]
    expect(addAt(arr, 0, 1)).toEqual([1, 2, 3, 4])
  })

  it("adds an item at the end of an array", () => {
    const arr = [1, 2, 3]
    expect(addAt(arr, arr.length, 4)).toEqual([1, 2, 3, 4])
  })

  it("adds an item betwwen items in the array", () => {
    const arr = [1, 3, 4]
    expect(addAt(arr, 1, 2)).toEqual([1, 2, 3, 4])
  })

  it("does not mutate the original array", () => {
    const arr = [1, 2, 3]
    expect(addAt(arr, arr.length, 4)).not.toBe(arr)
  })

  it("works with empty arrays", () => {
    const arr: number[] = []
    expect(addAt(arr, 0, 42)).toEqual([42])
  })
})

describe("getInitials", () => {
  it("returns initials for a normal full name", () => {
    expect(getInitials("John Doe")).toBe("JD")
  })

  it("trims extra spaces and still returns correct initials", () => {
    expect(getInitials("  John   Doe  ")).toBe("JD")
  })

  it("handles single-word names", () => {
    expect(getInitials("John")).toBe("J")
  })

  it("handles empty string", () => {
    expect(getInitials("")).toBe("")
  })

  it("handles lowercase names", () => {
    expect(getInitials("john doe")).toBe("JD")
  })
})
