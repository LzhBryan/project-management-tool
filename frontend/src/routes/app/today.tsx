import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/today")({
  component: TodayPage,
})

function TodayPage() {
  return <h1>Today</h1>
}
