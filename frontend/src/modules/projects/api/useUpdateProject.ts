import { useToast } from "@core/hooks/useToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { UpdateProjectDto } from "@/apiClient"
import { projectsApi } from "../../api"

export function useUpdateProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedProject: UpdateProjectDto) => {
      return projectsApi.projectsControllerUpdate(String(updatedProject.id), updatedProject)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: "Project has been updated" })
    },
  })
}
