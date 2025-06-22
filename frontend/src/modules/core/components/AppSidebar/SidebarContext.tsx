import { createContext, useContext } from "react"

interface SidebarContextType {
  activeSidebarItem: string
  setActiveSidebarItem: (sidebarItemName: string) => void
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebarContext() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarContextProvider.")
  }

  return context
}
