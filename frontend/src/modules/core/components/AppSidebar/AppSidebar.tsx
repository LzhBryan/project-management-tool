import { ProjectAccordion } from "@/modules/projects/components/ProjectAccordion/ProjectAccordion"
import { Link } from "@tanstack/react-router"
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@ui/sidebar"
import { CalendarCheck, CalendarDays, Inbox, PencilIcon } from "lucide-react"

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleOnClick = () => {
    return isMobile ? setOpenMobile(false) : undefined
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-x-4 pb-4 md:p-6">
        <PencilIcon />
        <h2>To do list</h2>
      </SidebarHeader>
      <SidebarContent className="px-[clamp(0.5rem,0.1421rem+1.7897vw,1rem)] md:px-8">
        <ul className="flex flex-col gap-y-3 md:gap-y-2" aria-label="Navbar">
          <li>
            <Link to="/app/today" className="flex items-center gap-x-3 py-2" onClick={handleOnClick} aria-label="Today">
              <CalendarCheck size={26} />
              Today
            </Link>
          </li>
          <li>
            <Link
              to="/app/upcoming"
              className="flex items-center gap-x-3 py-2"
              onClick={handleOnClick}
              aria-label="Upcoming"
            >
              <CalendarDays size={26} />
              Upcoming
            </Link>
          </li>
          <li>
            <Link to="/app/inbox" className="flex items-center gap-x-3 py-2" onClick={handleOnClick} aria-label="Inbox">
              <Inbox size={26} />
              Inbox
            </Link>
          </li>
          <li>
            <ProjectAccordion />
          </li>
          {/* <li>
            <Link to="/tags" className="flex gap-x-3 py-2" onClick={handleOnClick} aria-label="Tags">
              <Tags size={26} />
              Tags
            </Link>
          </li> */}
        </ul>
      </SidebarContent>
    </Sidebar>
  )
}
