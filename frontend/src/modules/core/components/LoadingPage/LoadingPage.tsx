import { LoaderCircle } from "lucide-react"

export function LoadingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <LoaderCircle aria-label="Loading" size={50} className="animate-spin" />
      <p className="text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  )
}
