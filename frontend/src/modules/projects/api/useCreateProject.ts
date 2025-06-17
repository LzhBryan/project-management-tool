import { useToast } from "@/modules/core/hooks/useToast"
import { authAxios } from "@/modules/core/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { IProject } from "../components/project.types"

export function useCreateProject() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newProject: Omit<IProject, "id" | "count">) => {
      return authAxios.post("api/projects", newProject)
    },
    onSuccess: async response => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({ description: `New project ${response.data.projectName} has been created` })
    },
  })
}
