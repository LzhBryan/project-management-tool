import { Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { useGetProjects } from "@/modules/projects/api/useGetProjects"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { Button } from "@ui/button"
import { Skeleton } from "@ui/skeleton"

import { DialogWrapper } from "@core/components/DialogWrapper"
import { Project } from "../Project/Project"
import { ProjectForm } from "../ProjectForm/ProjectForm"

export function Projects({ showProjectCount = false }: { showProjectCount?: boolean }) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col gap-y-4 pt-2">
          <p>Something went wrong, try again later</p>
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Suspense
        fallback={
          <ul className="flex flex-col gap-y-4" aria-label="Project list">
            {[1, 2, 3].map(i => (
              <li key={i} className="flex items-center gap-x-3" data-testid="project-skeleton">
                <Skeleton className="h-[10px] w-[10px]" />
                <Skeleton className="h-[30px] w-full" />
              </li>
            ))}
          </ul>
        }
      >
        <ProjectList showProjectCount={showProjectCount} />
      </Suspense>
    </ErrorBoundary>
  )
}

function ProjectList({ showProjectCount = false }: { showProjectCount?: boolean }) {
  const { data: projects, error, isFetching } = useGetProjects()
  const [openDialog, setOpenDialog] = useState(false)

  if (error && !isFetching) {
    throw error
  }

  if (!projects.length) {
    return (
      <div className="flex flex-col gap-y-4">
        <p className="text-base">You have no projects yet</p>
        <DialogWrapper
          open={openDialog}
          onOpenChange={setOpenDialog}
          trigger={<Button>Create one now!</Button>}
          title={"Add project"}
          description={"Add a project with name and color"}
        >
          <ProjectForm setOpenDialog={setOpenDialog} />
        </DialogWrapper>
      </div>
    )
  }

  return (
    <>
      {showProjectCount && <p className="mb-4">{`${projects.length} projects`}</p>}
      <ul className="flex flex-col gap-y-1" aria-label="Project list">
        {projects.map(project => (
          <Project key={project.id} project={project} />
        ))}
      </ul>
    </>
  )
}
