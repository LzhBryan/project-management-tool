import { useToast } from "@core/hooks/useToast"
import { authAxios } from "@core/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { IProject } from "../components/project.types"

export function useUpdateProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedProject: Omit<IProject, "count">) => {
      return authAxios.patch(`api/projects/${updatedProject.id}`, updatedProject)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: "Project has been updated" })
    },
  })
}
