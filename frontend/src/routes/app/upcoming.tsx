import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/upcoming")({
  component: UpcomingPage,
})

function UpcomingPage() {
  return <h1>Upcoming</h1>
}
