import { projectsQueryOptions, useGetProjects } from "@/modules/projects/api/useGetProjects"
import { Projects } from "@/modules/projects/components/Projects/Projects"
import { createFileRoute } from "@tanstack/react-router"
import { LoadingSpinner } from "@ui/loading-spinner"

export const Route = createFileRoute("/app/projects/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(projectsQueryOptions)
  },
  component: ProjectListPage,
  pendingComponent: () => (
    <h1 className="mb-6 flex items-center gap-x-4">
      Projects <LoadingSpinner />
    </h1>
  ),
})

function ProjectListPage() {
  const { isFetching } = useGetProjects()
  return (
    <>
      <h1 className="mb-6 flex items-center gap-x-4">Projects {isFetching && <LoadingSpinner />}</h1>
      <Projects showProjectCount={true} />
    </>
  )
}
