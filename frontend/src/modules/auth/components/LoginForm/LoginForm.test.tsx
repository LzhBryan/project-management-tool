import { API_BASE_URL } from "@/tests/mocks/constants"
import { server } from "@/tests/mocks/node"
import { renderComponent } from "@/tests/testUtils"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { LoginForm } from "./LoginForm"

const mockNavigate = vi.fn()

vi.mock(import("@tanstack/react-router"), async importOriginal => {
  const module = await importOriginal()
  return {
    ...module,
    useNavigate: () => mockNavigate,
  }
})

async function renderLoginForm() {
  await renderComponent(<LoginForm />)
  return { user: userEvent.setup() }
}

const emailField = () => screen.getByRole("textbox", { name: "Email" })
const passwordField = () => screen.getByLabelText("Password")
const signInButton = () => screen.getByRole("button", { name: "Sign in" })
const registerPageLink = () => screen.getByRole("link", { name: "Sign up here" })

describe("Login form", () => {
  test("login form render", async () => {
    await renderLoginForm()

    expect(screen.getByRole("form", { name: "Login form" })).toBeVisible()
    expect(emailField()).toBeVisible()
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeVisible()
    expect(passwordField()).toBeVisible()
    expect(screen.getByPlaceholderText("Enter your password")).toBeVisible()
    expect(signInButton()).toBeVisible()
    expect(screen.getByText("Don't have an account?")).toBeVisible()
    expect(registerPageLink()).toBeVisible()
  })

  test("show error message when email entered is not valid", async () => {
    const { user } = await renderLoginForm()

    await user.type(emailField(), "invalid@email")
    await user.type(passwordField(), "password")
    await user.click(signInButton())

    expect(screen.getByText("Please enter a valid email")).toBeVisible()
  })

  test("show error message when password entered is less than 6 characters", async () => {
    const { user } = await renderLoginForm()

    await user.type(emailField(), "user@gmail.com")
    await user.type(passwordField(), "12345")
    await user.click(signInButton())

    expect(screen.getByText("Password must be at least 6 characters long")).toBeVisible()
  })

  test("show error message from server when login credentials is invalid", async () => {
    server.use(
      http.post(`${API_BASE_URL}/auth/login`, () => {
        return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 })
      }),
    )

    const { user } = await renderLoginForm()

    await user.type(emailField(), "user@gmail.com")
    await user.type(passwordField(), "123456")
    await user.click(signInButton())

    expect(screen.getByText("Invalid credentials")).toBeVisible()
  })

  test("redirects user to today page if user can login successfully", async () => {
    const { user } = await renderLoginForm()

    await user.type(emailField(), "asdasd@gmail.com")
    await user.type(passwordField(), "123456")
    await user.click(signInButton())

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/app/today" })
  })

  test("redirects user to register page if user correctly", async () => {
    const { user } = await renderLoginForm()
    await user.click(registerPageLink())
  })
})
