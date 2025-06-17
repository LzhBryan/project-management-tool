import { RegisterForm } from "@/modules/auth/components/RegisterForm/RegisterForm"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_auth/register")({
  component: RegisterForm,
})
