import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { renderComponent } from "@/tests/testUtils"
import { RegisterForm } from "./RegisterForm"

const renderRegisterForm = async () => {
  await renderComponent(<RegisterForm />)
  return { user: userEvent.setup() }
}

describe("Register form", () => {
  test("register form render", async () => {
    await renderRegisterForm()

    expect(screen.getByRole("form", { name: "Register user" })).toBeVisible()
    expect(screen.getByLabelText("Name")).toBeVisible()
    expect(screen.getByPlaceholderText("John Doe")).toBeVisible()
    expect(screen.getByRole("textbox", { name: "Name" })).toBeVisible()
    expect(screen.getByLabelText("Email")).toBeVisible()
    expect(screen.getByRole("textbox", { name: "Email" })).toBeVisible()
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeVisible()
    expect(screen.getByLabelText("Password")).toBeVisible()
    expect(screen.getByPlaceholderText("Enter your password")).toBeVisible()
    expect(screen.getByRole("button", { name: "Sign up" })).toBeVisible()
  })

  test("show error message when email entered is not valid", async () => {
    const { user } = await renderRegisterForm()

    await user.type(screen.getByRole("textbox", { name: "Name" }), "name")
    await user.type(screen.getByRole("textbox", { name: "Email" }), "invalid@email")
    await user.type(screen.getByLabelText("Password"), "password")
    await user.click(screen.getByRole("button", { name: "Sign up" }))

    expect(screen.getByText("Please enter a valid email")).toBeVisible()
  })

  test("show error message when password entered is less than 6 characters", async () => {
    const { user } = await renderRegisterForm()

    await user.type(screen.getByRole("textbox", { name: "Name" }), "name")
    await user.type(screen.getByRole("textbox", { name: "Email" }), "user@gmail.com")
    await user.type(screen.getByLabelText("Password"), "12345")
    await user.click(screen.getByRole("button", { name: "Sign up" }))

    expect(screen.getByText("Password must be at least 6 characters long")).toBeVisible()
  })
})
