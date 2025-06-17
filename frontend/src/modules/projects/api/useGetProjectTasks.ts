import { authAxios } from "@core/lib/axios"
import { useSuspenseQuery } from "@tanstack/react-query"

import { ProjectWithTasks } from "../components/project.types"

export const projectTasksQueryOptions = (projectId: string) => ({
  queryKey: ["projects", projectId],
  queryFn: async function () {
    const response = await authAxios.get(`api/projects/${projectId}`)
    return response.data
  },
  retry: false,
})

export function useGetProjectTasks(projectId: string) {
  const { data, error, isFetching } = useSuspenseQuery<ProjectWithTasks>(projectTasksQueryOptions(projectId))

  return { data, error, isFetching }
}
