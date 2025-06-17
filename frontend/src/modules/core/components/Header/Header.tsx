import { useTheme } from "@core/ThemeProvider"
import { Link } from "@tanstack/react-router"
import { Bell, LogOut, Moon, Sun, UserRound } from "lucide-react"

import { useLogout } from "@/modules/auth/hooks/useLogout"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Button } from "@ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"

import { SidebarTrigger } from "@ui/sidebar"
import { SearchBar } from "../SearchBar/SearchBar"
import { TooltipWrapper } from "../TooltipWrapper"

export function Header() {
  const { setTheme } = useTheme()
  const logout = useLogout()

  return (
    <header className="flex items-center justify-between bg-orange-300 px-4 py-3">
      <TooltipWrapper
        triggerElement={<SidebarTrigger aria-label="Toggle sidebar" />}
        content={"Toggle sidebar CTRL + B"}
      />
      <SearchBar />
      <div className="flex items-center gap-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="icon"
              aria-label="Notifications"
              aria-controls="notifications-menu"
              id="notifications"
              className="hidden rounded-full md:block"
            >
              <Bell size={28} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="icon"
              aria-label="Toggle theme"
              aria-controls="toggle-theme-menu"
              id="toggle-theme"
            >
              <Sun
                className="hidden h-[28px] w-[28px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:block"
                aria-label="Light mode icon"
              />

              <Moon
                className="absolute hidden h-[28px] w-[28px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:block"
                aria-label="Dark mode icon"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            id="toggle-theme-menu"
            aria-labelledby="toggle-theme"
            aria-label="Toggle theme"
          >
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="none"
              aria-label="User settings"
              aria-controls="user-settings-menu"
              id="user-settings"
              className="ml-1 rounded-full"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            id="user-settings-menu"
            aria-labelledby="user-settings"
            aria-label="User settings"
            className="mr-4 flex flex-col gap-y-1 p-2"
          >
            <DropdownMenuItem asChild>
              <Link className="flex items-center gap-x-3" href="/user/profile" aria-label="User profile">
                <UserRound size={28} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button variant="menuitem" size="none" onClick={logout}>
                <LogOut size={28} />
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
