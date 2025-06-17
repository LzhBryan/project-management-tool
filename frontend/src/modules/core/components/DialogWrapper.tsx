import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as ShadcnDialog,
} from "@ui/dialog"
import React from "react"

interface DialogWrapperProps {
  open: boolean
  onOpenChange: (showDialog: boolean) => void
  trigger?: string | React.JSX.Element
  title: string | React.JSX.Element
  description: string | React.JSX.Element
  children: React.ReactNode
  triggerAsChild?: boolean
}

export function DialogWrapper({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  triggerAsChild = true,
}: DialogWrapperProps) {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description} </DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </ShadcnDialog>
  )
}
