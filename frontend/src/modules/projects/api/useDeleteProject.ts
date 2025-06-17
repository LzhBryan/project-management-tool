import { useToast } from "@core/hooks/useToast"
import { authAxios } from "@core/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: string) => {
      return authAxios.delete(`api/projects/${projectId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: "Project has been deleted" })
    },
  })
}
