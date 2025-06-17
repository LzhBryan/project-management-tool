import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip"
import React from "react"

export type TooltipWrapperProps = {
  triggerElement: React.JSX.Element
  content: string | React.JSX.Element
  triggerAsChild?: boolean
}

export function TooltipWrapper({ triggerElement, content, triggerAsChild = true }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger asChild={triggerAsChild}>{triggerElement}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
}
