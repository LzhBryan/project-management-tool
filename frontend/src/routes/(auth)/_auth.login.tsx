import { LoginForm } from "@/modules/auth/components/LoginForm/LoginForm"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: LoginForm,
})
