import React from "react"
import ReactDOM from "react-dom/client"
import { AppContextProvider, EventsContextProvider } from "@/context"
import { App } from "@/pages/App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <EventsContextProvider>
        <App />
      </EventsContextProvider>
    </AppContextProvider>
  </React.StrictMode>
)
