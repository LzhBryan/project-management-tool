import { authAxios } from "@core/lib/axios"
import { useSuspenseQuery } from "@tanstack/react-query"

import { ProjectsData } from "../components/project.types"

export const projectsQueryOptions = {
  queryKey: ["projects"],
  queryFn: async function () {
    const response = await authAxios.get("api/projects")
    return response.data
  },
  retry: false,
}

export function useGetProjects() {
  const { data, error, isFetching } = useSuspenseQuery<ProjectsData>(projectsQueryOptions)
  return { data, error, isFetching }
}
