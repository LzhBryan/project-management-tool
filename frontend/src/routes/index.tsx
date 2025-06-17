import { useCheckAuthentication } from "@/modules/auth/hooks/useCheckAuthentication"
import { LoadingPage } from "@core/components/LoadingPage/LoadingPage"
import { createFileRoute, Link, Navigate } from "@tanstack/react-router"
import { Button } from "@ui/button"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

function LandingPage() {
  const { isUserAuthenticated, isLoading } = useCheckAuthentication()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isUserAuthenticated) {
    return <Navigate to="/app/today" />
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-y-12 p-4">
      <h1>Landing Page</h1>
      <Link to="/login">
        <Button>Get Started</Button>
      </Link>
    </section>
  )
}
