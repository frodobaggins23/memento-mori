import { useState, useCallback } from "react"
import { Scales } from "@/types"

const scalesOrder: Array<Scales> = ["small", "medium", "large"]

export const useScale = () => {
  const [scale, setScale] = useState<Scales>("small")

  const nextScale = useCallback(() => {
    setScale((prevScale) => {
      const currentIndex = scalesOrder.indexOf(prevScale)
      const nextIndex = currentIndex + 1 === scalesOrder.length ? 0 : currentIndex + 1

      return scalesOrder[nextIndex]
    })
  }, [])

  return { scale, nextScale }
}
