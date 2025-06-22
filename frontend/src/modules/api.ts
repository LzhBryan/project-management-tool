import { ProjectsApi } from "@/apiClient"
import { authAxios } from "@/modules/core/lib/axios"
import { API_BASE_URL } from "@/tests/mocks/constants"

export const projectsApi = new ProjectsApi(undefined, API_BASE_URL, authAxios)
