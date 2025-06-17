import { useCheckAuthentication } from "@/modules/auth/hooks/useCheckAuthentication"
import { LoadingPage } from "@core/components/LoadingPage/LoadingPage"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_auth")({
  component: WelcomeScreenLayout,
})

function WelcomeScreenLayout() {
  const { isUserAuthenticated, isLoading } = useCheckAuthentication()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isUserAuthenticated) {
    return <Navigate to="/app" />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8 px-[clamp(2rem,1.143rem+4.286vw,5rem)] py-8 sm:grid sm:grid-cols-[1fr,min(400px,40%)] sm:gap-x-14 md:col-span-2">
      <section>
        <h1>Welcome to [App Name] - Your Productivity Partner!</h1>
        <p>
          Stay organized, stay focused, and get more done with ease. Whether you're managing personal tasks, work
          projects, or everything in between, [App Name] is designed to help you organize your to-do lists, prioritize
          what matters most, and track your progress effortlessly.
        </p>
        <h2>Why Choose [App Name]? Simple & Intuitive:</h2>
        <ul>
          <li>Simple & Intuitive: Create, edit, and organize tasks in just a few clicks.</li>
          <li>Stay On Track: Set due dates, reminders, and recurring tasks to never miss a deadline.</li>
          <li>
            Collaborate with Ease: Share tasks with friends, family, or coworkers and work together to get things done.
          </li>
          <li>
            Track Progress: Celebrate your victories with progress bars and completion stats to keep you motivated.
          </li>
        </ul>
        <h3>Ready to get started? Sign up for free and take control of your day!</h3>
        <h4>Features You'll Love: </h4>
        <ul>
          <li>Drag & drop task management</li>
          <li>Customizable task categories</li>
          <li> Multi-device sync Smart notifications and reminders</li>
        </ul>
        <p>Get organized today and achieve more tomorrow.</p>
      </section>
      <Outlet />
    </div>
  )
}
