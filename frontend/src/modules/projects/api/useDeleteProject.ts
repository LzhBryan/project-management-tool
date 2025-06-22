import { useToast } from "@core/hooks/useToast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "../../api"

export function useDeleteProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: number) => {
      return projectsApi.projectsControllerRemove(String(projectId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: "Project has been deleted" })
    },
  })
}
