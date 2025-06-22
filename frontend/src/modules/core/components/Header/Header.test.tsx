import { renderComponent } from "@/tests/testUtils"
import { screen } from "@testing-library/react"
import { SidebarProvider } from "../../ui/sidebar"
import { Header } from "./Header"

const toggleSidebarBtn = () => screen.getByRole("button", { name: "Toggle sidebar" })

describe("Header component", () => {
  test("rendering", async () => {
    await renderComponent(
      <SidebarProvider>
        <Header />
      </SidebarProvider>,
    )

    expect(toggleSidebarBtn()).toBeVisible()
  })
})
