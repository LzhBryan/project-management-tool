import { useToast } from "@/modules/core/hooks/useToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CreateProjectDto } from "@/apiClient"
import { projectsApi } from "@/modules/api"

export function useCreateProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProject: CreateProjectDto) => {
      return await projectsApi.projectsControllerCreate(newProject)
    },
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: `New project ${data.newProjectName} has been created` })
    },
  })
}
