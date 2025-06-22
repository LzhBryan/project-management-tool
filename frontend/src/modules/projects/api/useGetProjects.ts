import { useSuspenseQuery } from "@tanstack/react-query"

import { GetProjectsResponseDto } from "@/apiClient"
import { projectsApi } from "../../api"

export const projectsQueryOptions = {
  queryKey: ["projects"],
  queryFn: async function () {
    const response = await projectsApi.projectsControllerFindAll()
    return response.data
  },
  retry: false,
}

export function useGetProjects() {
  const { data, error, isFetching } = useSuspenseQuery<GetProjectsResponseDto[]>(projectsQueryOptions)
  return { data, error, isFetching }
}
