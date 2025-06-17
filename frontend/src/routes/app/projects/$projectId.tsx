import { LoadingPage } from "@/modules/core/components/LoadingPage/LoadingPage"
import { LoadingSpinner } from "@/modules/core/ui/loading-spinner"
import { projectTasksQueryOptions, useGetProjectTasks } from "@/modules/projects/api/useGetProjectTasks"
import { Tasks } from "@/modules/tasks/components/Tasks/Tasks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/projects/$projectId")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(projectTasksQueryOptions(params.projectId))
  },
  component: ProjectPage,
  pendingComponent: () => <LoadingPage />,
})

function ProjectPage() {
  const { projectId } = Route.useParams()
  const { data, isFetching } = useGetProjectTasks(projectId)

  return (
    <>
      <h1 className="mb-6 flex items-center gap-x-4">
        {data.projectName}
        {isFetching && <LoadingSpinner />}
      </h1>
      <Tasks tasks={data.tasks} />
    </>
  )
}
