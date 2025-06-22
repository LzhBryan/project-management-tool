import { useIsFetching } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { CalendarCheck, CalendarDays, Folders, Inbox, Plus } from "lucide-react"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion"
import { Button } from "@ui/button"
import { LoadingSpinner } from "@ui/loading-spinner"
import { Sidebar, SidebarContent, useSidebar } from "@ui/sidebar"

import { ProjectForm } from "@/modules/projects/components/ProjectForm/ProjectForm"
import { Projects } from "@/modules/projects/components/Projects/Projects"
import { DialogWrapper } from "@core/components/DialogWrapper"
import { SidebarContext } from "./SidebarContext"

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const [openDialog, setOpenDialog] = useState(false)
  const isFetchingCount = useIsFetching({ queryKey: ["projects"] })
  const [activeSidebarItem, setActiveSidebarItem] = useState("today")

  const handleOnClick = (sidebarItemName: string) => {
    if (isMobile) {
      setOpenMobile(false)
    }
    setActiveSidebarItem(sidebarItemName)
  }

  const sideBarMenuItemCss = (sidebarItemName: string) => {
    return `${activeSidebarItem === sidebarItemName ? "bg-slate-300 dark:bg-slate-800" : ""} rounded-lg pl-4 pr-1 hover:bg-slate-300 dark:hover:bg-slate-800`
  }

  return (
    <Sidebar className="py-4">
      <SidebarContent className="px-[clamp(0.5rem,0.1421rem+1.7897vw,1rem)] md:px-8">
        <SidebarContext.Provider value={{ activeSidebarItem, setActiveSidebarItem }}>
          <ul className="flex flex-col gap-y-3 md:gap-y-2" aria-label="Navbar">
            <li className={sideBarMenuItemCss("today")}>
              <Link to="/app/today" className="flex items-center gap-x-3 py-2" onClick={() => handleOnClick("today")}>
                <CalendarCheck size={26} />
                Today
              </Link>
            </li>
            <li className={sideBarMenuItemCss("upcoming")}>
              <Link
                to="/app/upcoming"
                className="flex items-center gap-x-3 py-2"
                onClick={() => handleOnClick("upcoming")}
              >
                <CalendarDays size={26} />
                Upcoming
              </Link>
            </li>
            <li className={sideBarMenuItemCss("inbox")}>
              <Link to="/app/inbox" className="flex items-center gap-x-3 py-2" onClick={() => handleOnClick("inbox")}>
                <Inbox size={26} />
                Inbox
              </Link>
            </li>
            <li>
              <Accordion type="single" collapsible defaultValue="projects" asChild>
                <AccordionItem value="projects">
                  <div className={`flex items-center py-1 ${sideBarMenuItemCss("projects")} mb-1`}>
                    <Folders size={26} aria-label="Folders" />
                    <Link to="/app/projects" className="flex-1 pl-3" onClick={() => handleOnClick("projects")}>
                      Projects
                    </Link>
                    {isFetchingCount > 0 && <LoadingSpinner size={18} />}
                    <DialogWrapper
                      open={openDialog}
                      onOpenChange={setOpenDialog}
                      trigger={
                        <Button variant="icon" size="icon" aria-label="Add project">
                          <Plus size={18} />
                        </Button>
                      }
                      title={"Add project"}
                      description={"Add a project with name and colour"}
                    >
                      <ProjectForm setOpenDialog={setOpenDialog} />
                    </DialogWrapper>
                    <AccordionTrigger
                      id="project-list-toggle"
                      aria-label="Toggle project list"
                      aria-controls="project-list"
                    ></AccordionTrigger>
                  </div>
                  <AccordionContent
                    asChild
                    id="project-list"
                    aria-label="Project list"
                    aria-labelledby="project-list-toggle"
                  >
                    <Projects />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            {/* <li>
            <Link to="/tags" className="flex gap-x-3 py-2" onClick={handleOnClick}>
              <Tags size={26} />
              Tags
            </Link>
          </li> */}
          </ul>
        </SidebarContext.Provider>
      </SidebarContent>
    </Sidebar>
  )
}
