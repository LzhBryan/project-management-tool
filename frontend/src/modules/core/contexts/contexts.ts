import { createContext, useContext } from "react"

import { NavbarContextType } from "@core/types"

export const NavbarContext = createContext<NavbarContextType | null>(null)

export function useNavbarContext() {
  const navbarContext = useContext(NavbarContext)

  if (!navbarContext) {
    throw new Error("use navbar context error   ")
  }

  return navbarContext
}
