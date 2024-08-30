import { FC, ReactNode, useCallback, useRef } from "react"
import styles from "./styles.module.scss"

interface TooltipProps {
  text: ReactNode
  children: ReactNode
}

const handleTooltipEdgePosition = (tooltipRef: HTMLDivElement | null) => {
  if (!tooltipRef) return

  const gutter = 50
  const tooltipRect = tooltipRef.getBoundingClientRect()
  const tooltipRightX = tooltipRect.x + tooltipRect.width
  const isHiddenOnLeft = tooltipRect.x < gutter
  const isHiddenOnRight = tooltipRightX > window.innerWidth - gutter

  if (isHiddenOnLeft) tooltipRef.style.left = `${gutter}px`
  if (isHiddenOnRight) {
    tooltipRef.style.right = "0px"
    tooltipRef.style.left = "auto"
  }
}

export const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleHoover = useCallback(() => handleTooltipEdgePosition(tooltipRef.current), [])

  return (
    <div className={styles.tooltipContainer} onMouseOver={handleHoover}>
      {children}
      <span className={styles.tooltipText} ref={tooltipRef}>
        {text}
      </span>
    </div>
  )
}
