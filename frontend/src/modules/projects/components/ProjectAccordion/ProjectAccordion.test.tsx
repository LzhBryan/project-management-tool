import { testProject1, testProject2 } from "@/mocks/handlers/project"
import { TestQueryClient } from "@/modules/testQueryClient"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { API_BASE_URL } from "@/mocks/constants"
import { server } from "@/mocks/node"
import { SidebarProvider } from "@/modules/core/ui/sidebar"
import { renderComponent } from "@/tests/testUtils"
import { http, HttpResponse } from "msw"
import { ProjectAccordion } from "./ProjectAccordion"
async function renderProjectAccordion() {
  server.use(
    http.post(`${API_BASE_URL}/api/projects`, () => {
      return HttpResponse.json({ data: [testProject1, testProject2] }, { status: 200 })
    }),
  )

  renderComponent(
    <TestQueryClient>
      <SidebarProvider>
        <ProjectAccordion />
      </SidebarProvider>
    </TestQueryClient>,
  )

  expect(screen.getByRole("progressbar")).toBeVisible()
  expect(screen.getAllByRole("listitem")).toHaveLength(3)

  await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument())

  return { user: userEvent.setup() }
}

describe("Project accordion", () => {
  test("renders UI and data correctly", async () => {
    await renderProjectAccordion()

    expect(screen.getByLabelText("Folders")).toBeVisible()
    expect(screen.getByRole("link", { name: "Projects" })).toBeVisible()
    expect(screen.getByRole("button", { name: "Add project" })).toBeVisible()
    expect(screen.getByRole("button", { name: "Toggle project list" })).toBeVisible()

    expect(screen.getByRole("list", { name: "Project list" })).toBeVisible()

    expect(screen.getAllByRole("listitem")).toHaveLength(2)
    expect(screen.getByRole("link", { name: testProject1.name })).toBeVisible()
    expect(screen.getByRole("link", { name: testProject2.name })).toBeVisible()
  })

  test("add project button should open up a dialog form to add project", async () => {
    const { user } = await renderProjectAccordion()

    await user.click(screen.getByRole("button", { name: "Add project" }))

    expect(screen.getByRole("dialog", { name: "Add project" })).toBeVisible()
  })

  test("project accordion toggle project list", async () => {
    const { user } = await renderProjectAccordion()

    await user.click(screen.getByRole("button", { name: "Toggle project list" }))

    expect(screen.queryByText(testProject1.name)).not.toBeInTheDocument()
    expect(screen.queryByText(testProject2.name)).not.toBeInTheDocument()
  })
})
