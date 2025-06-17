import { TestQueryClient } from "@/modules/testQueryClient"
import { renderComponent } from "@/tests/testUtils"
import { screen } from "@testing-library/react"
import { SidebarProvider } from "@ui/sidebar"
import { AppSidebar } from "./AppSidebar"

describe("App sidebar", () => {
  test("rendering", () => {
    renderComponent(
      <TestQueryClient>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </TestQueryClient>,
    )

    expect(screen.getByRole("heading", { level: 2, name: "To do list" })).toBeVisible()
  })
})
