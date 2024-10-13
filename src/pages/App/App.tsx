import { useContext, useMemo } from "react"
import { Container } from "@/components/container"
import { EventsButton } from "@/components/events-button"
import { EventsList } from "@/components/events-list"
import { Item } from "@/components/item"
import { ItemGrid } from "@/components/item-grid"
import { Modal } from "@/components/modal"
import { ScaleButton } from "@/components/scale-button"
import { Settings } from "@/components/settings"
import { SettingsButton } from "@/components/settings-button"
import { Toolbar } from "@/components/toolbar"
import { AppContext } from "@/context/AppContext"
import { useOpen } from "@/hooks/useOpen"

export const App = () => {
  const { scale, nextScale, weekCount, settings } = useContext(AppContext)
  const [showModal, modalHandlers] = useOpen(false)
  const [showEvents, eventsHandlers] = useOpen(false)
  const forceSettings = !settings.dob

  const itemCount = useMemo(() => {
    return weekCount.current + weekCount.toGo
  }, [weekCount])

  return (
    <Container>
      <ItemGrid scale={scale}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <Item key={index} orderNumber={index} active={index < weekCount.current} scale={scale} />
        ))}
      </ItemGrid>
      <Toolbar>
        <ScaleButton scale={scale} handleClick={nextScale} />
        <SettingsButton handleClick={modalHandlers.open} />
        <EventsButton handleOnClick={eventsHandlers.toggle} />
      </Toolbar>
      <EventsList showEvents={showEvents} handleClose={eventsHandlers.close} />
      <Modal visible={forceSettings || showModal} handleClose={modalHandlers.close} size="large" title="Settings">
        <Settings onModalSubmit={modalHandlers.close} />
      </Modal>
    </Container>
  )
}
