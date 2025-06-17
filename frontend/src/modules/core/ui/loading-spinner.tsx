import { LoaderCircle } from "lucide-react"

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return <LoaderCircle role="progressbar" size={size} className="animate-spin" />
}
