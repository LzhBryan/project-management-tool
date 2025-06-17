import { Link } from "@tanstack/react-router"
import { Folders, Plus } from "lucide-react"
import { useState } from "react"

import { useIsFetching } from "@tanstack/react-query"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion"
import { Button } from "@ui/button"

import { DialogWrapper } from "@core/components/DialogWrapper"
import { LoadingSpinner } from "@ui/loading-spinner"
import { useSidebar } from "@ui/sidebar"
import { ProjectForm } from "../ProjectForm/ProjectForm"
import { Projects } from "../Projects/Projects"

export function ProjectAccordion() {
  const { isMobile, setOpenMobile } = useSidebar()
  const [openDialog, setOpenDialog] = useState(false)
  const isFetchingCount = useIsFetching({ queryKey: ["projects"] })

  return (
    <Accordion type="single" collapsible defaultValue="projects" asChild>
      <AccordionItem value="projects">
        <div className="flex items-center py-1">
          <Folders size={26} aria-label="Folders" />
          <Link to="/app/projects" className="flex-1 pl-3" onClick={isMobile ? () => setOpenMobile(false) : undefined}>
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
            <ProjectForm flag="create" setOpenDialog={setOpenDialog} />
          </DialogWrapper>
          <AccordionTrigger
            id="project-list-toggle"
            aria-label="Toggle project list"
            aria-controls="project-list"
          ></AccordionTrigger>
        </div>
        <AccordionContent asChild id="project-list" aria-label="Project list" aria-labelledby="project-list-toggle">
          <Projects />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
