import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/app/today" />
}
