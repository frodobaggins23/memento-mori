import { FC, useContext } from "react"
import { Item, Props } from "./Item"
import styles from "./styles.module.scss"
import { AppContext } from "@/context/AppContext"

type WrapperProps = Omit<Props, "dob">

export const ItemWrapper: FC<WrapperProps> = (props) => {
  const { settings } = useContext(AppContext)

  if (!settings.dob) return <div className={`${styles.item} ${styles[props.scale]}`} />

  return <Item {...props} dob={settings.dob} />
}
