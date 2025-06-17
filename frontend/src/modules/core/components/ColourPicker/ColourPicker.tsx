import { ForwardedRef, forwardRef } from "react"
import { useController, UseControllerProps } from "react-hook-form"

import { FormControl, FormItem, FormLabel } from "@ui/form"
import { RadioGroup, RadioGroupItem } from "@ui/radio-group"

// eslint-disable-next-line react-refresh/only-export-components
export const colourChoices = [
  { name: "Berry red", colour: "#b8255f" },
  { name: "Red", colour: "#cf473a" },
  { name: "Orange", colour: "#c77100" },
  { name: "Yellow", colour: "#b29104" },
  { name: "Olive green", colour: "#949c31" },
  { name: "Lime green", colour: "#65a33a" },
  { name: "Green", colour: "#369307" },
  { name: "Mint green", colour: "#42a393" },
  { name: "Teal", colour: "#148fad" },
  { name: "Sky blue", colour: "#319dc0" },
  { name: "Light blue", colour: "#6988a4" },
  { name: "Blue", colour: "#2a67e2" },
  { name: "Grape", colour: "#692ec2" },
  { name: "Violet", colour: "#ac30cc" },
  { name: "Lavender", colour: "#a4698c" },
  { name: "Magenta", colour: "#e05095" },
  { name: "Salmon", colour: "#b2635c" },
  { name: "Charcoal", colour: "#808080" },
  { name: "Grey", colour: "#999999" },
  { name: "Taupe", colour: "#8f7a69" },
]

interface FormValues {
  colour: string
}

export default forwardRef<HTMLDivElement, UseControllerProps<FormValues>>(ColourPicker)

function ColourPicker(props: UseControllerProps<FormValues>, ref: ForwardedRef<HTMLDivElement>) {
  const { field } = useController(props)

  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      ref={ref}
      className="grid grid-cols-[repeat(5,minmax(32px,1fr))] content-center justify-center justify-items-center gap-x-4 gap-y-2"
    >
      {colourChoices.map(colourChoice => (
        <FormItem key={colourChoice.name}>
          <FormControl>
            <RadioGroupItem
              className={`rounded-full border-0 p-4 focus-visible:ring focus-visible:ring-offset-4 dark:border-slate-950 ${field.value === colourChoice.colour ? "ring ring-slate-800 ring-offset-4 dark:ring-slate-200 dark:ring-offset-slate-950" : ""} focus-visible:ring-slate-800`}
              style={{ backgroundColor: colourChoice.colour }}
              value={colourChoice.colour}
              aria-label={colourChoice.name}
            />
          </FormControl>
          <FormLabel hidden />
        </FormItem>
      ))}
    </RadioGroup>
  )
}
