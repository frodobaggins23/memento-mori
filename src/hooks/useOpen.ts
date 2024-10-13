import { useState } from "react"

export const useOpen = (initialState = false): [isOpen: boolean, handlers: Record<"open" | "close" | "toggle", () => void>] => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return [isOpen, { open, close, toggle }]
}
