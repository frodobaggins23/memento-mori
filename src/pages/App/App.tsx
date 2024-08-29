import { Container } from "@/components/container"
import { Item } from "@/components/item"
import { ItemGrid } from "@/components/item-grid"
import { ScaleButton } from "@/components/scale-button"
import { SettingsButton } from "@/components/settings-button"
import { Toolbar } from "@/components/toolbar"
import { useScale } from "@/hooks/useScale"

const REPEAT_COUNT = 4200
const CURRENT_COUNT = 1920

export const App = () => {
  const { scale, nextScale } = useScale()
  return (
    <Container>
      <ItemGrid scale={scale}>
        {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
          <Item
            key={index}
            orderNumber={index + 1}
            startDate="2021-01-01"
            endDate="2021-12-31"
            note="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            active={index < CURRENT_COUNT}
            scale={scale}
          />
        ))}
      </ItemGrid>
      <Toolbar>
        <ScaleButton scale={scale} handleClick={nextScale} />
        <SettingsButton />
      </Toolbar>
    </Container>
  )
}
