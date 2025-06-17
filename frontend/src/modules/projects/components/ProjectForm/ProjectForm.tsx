import { useForm } from "react-hook-form"
import { z } from "zod"

import { useCreateProject } from "@/modules/projects/api/useCreateProject"
import { useUpdateProject } from "@/modules/projects/api/useUpdateProject"
import ColourPicker, { colourChoices } from "@core/components/ColourPicker/ColourPicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form"
import { Input } from "@ui/input"

import { IProject } from "../project.types"

const projectFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name must be at least 1 character" }),
    colour: z.string().length(7).regex(/^#/, { message: "Color must be in hex codes format" }),
  })
  .strict()

interface ProjectFormProps {
  setOpenDialog: (openDialog: boolean) => void
  projectToUpdate?: IProject
  flag: "create" | "update"
}

export function ProjectForm(projectFormProps: ProjectFormProps) {
  const { setOpenDialog, projectToUpdate, flag } = projectFormProps
  const { mutate: createProjectMutate } = useCreateProject()
  const { mutate: updateProjectMutate } = useUpdateProject()

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: flag === "create" ? "" : projectToUpdate?.name,
      colour: flag === "create" ? colourChoices[0].colour : projectToUpdate?.colour,
    },
  })

  function onSubmit(values: z.infer<typeof projectFormSchema>) {
    if (flag === "create") {
      createProjectMutate(values)
    } else {
      updateProjectMutate({ ...values, id: projectToUpdate!.id })
    }
    setOpenDialog(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 py-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-x-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Music" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colour"
          render={({ field }) => (
            <FormItem className="w-full self-center">
              <FormControl>
                <ColourPicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" type="submit">
          {flag === "create" ? "Add project" : "Update project"}
        </Button>
      </form>
    </Form>
  )
}
