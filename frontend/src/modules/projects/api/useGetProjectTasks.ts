import { GetProjectResponseDto } from "@/apiClient"
import { useSuspenseQuery } from "@tanstack/react-query"
import { projectsApi } from "../../api"

export const projectTasksQueryOptions = (projectId: string) => ({
  queryKey: ["projects", projectId],
  queryFn: async function () {
    const response = await projectsApi.projectsControllerFindOne(projectId)
    return response.data
  },
  retry: false,
})

export function useGetProjectTasks(projectId: string) {
  const { data, error, isFetching } = useSuspenseQuery<GetProjectResponseDto>(projectTasksQueryOptions(projectId))
  return { data, error, isFetching }
}
