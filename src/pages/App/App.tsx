import { useContext, useMemo, useState } from "react"
import { Container } from "@/components/container"
import { Item } from "@/components/item"
import { ItemGrid } from "@/components/item-grid"
import { Modal } from "@/components/modal"
import { ScaleButton } from "@/components/scale-button"
import { Settings } from "@/components/settings"
import { SettingsButton } from "@/components/settings-button"
import { Toolbar } from "@/components/toolbar"
import { AppContext } from "@/context/AppContext"

export const App = () => {
  const { scale, nextScale, weekCount } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

  const itemCount = useMemo(() => {
    return weekCount.current + weekCount.toGo
  }, [weekCount])

  return (
    <Container>
      <ItemGrid scale={scale}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <Item
            key={index}
            orderNumber={index + 1}
            startDate="2021-01-01"
            endDate="2021-12-31"
            note="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            active={index < weekCount.current}
            scale={scale}
          />
        ))}
      </ItemGrid>
      <Toolbar>
        <ScaleButton scale={scale} handleClick={nextScale} />
        <SettingsButton handleClick={() => setShowModal(true)} />
      </Toolbar>
      <Modal visible={showModal} handleClose={() => setShowModal(false)}>
        <Settings />
      </Modal>
    </Container>
  )
}
