import { API_BASE_URL } from "@/tests/mocks/constants"
import { server } from "@/tests/mocks/node"
import { renderComponent, TestQueryClient } from "@/tests/testUtils"
import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SidebarProvider } from "@ui/sidebar"
import { delay, http, HttpResponse } from "msw"
import { AppSidebar } from "./AppSidebar"

async function renderSidebar(waitForLoading = false) {
  await renderComponent(
    <TestQueryClient>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </TestQueryClient>,
  )

  if (waitForLoading) {
    await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument())
  }

  return { user: userEvent.setup() }
}

describe("App sidebar", () => {
  test("rendering", async () => {
    await renderSidebar()

    expect(screen.getByRole("link", { name: "Today" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Upcoming" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Inbox" })).toBeVisible()
  })
})

describe("Project accordion", () => {
  const projectsContainer = () => screen.getByRole("link", { name: "Projects" }).parentElement!.parentElement!
  const addProjectBtn = () => screen.getByRole("button", { name: "Add project" })
  const toggleProjectListBtn = () => screen.getByRole("button", { name: "Toggle project list" })

  test("renders with projects data", async () => {
    await renderSidebar(true)

    expect(screen.getByRole("link", { name: "Projects" })).toBeVisible()
    expect(screen.getByLabelText("Folders")).toBeVisible()
    expect(addProjectBtn()).toBeVisible()
    expect(toggleProjectListBtn()).toBeVisible()
    expect(screen.getByRole("list", { name: "Project list" })).toBeVisible()
    expect(within(projectsContainer()).getAllByRole("listitem")).toHaveLength(2)
    expect(screen.getByRole("link", { name: "Music" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Fitness" })).toBeVisible()
  })

  test("renders fallback UI when there is no projects", async () => {
    server.use(http.get(`${API_BASE_URL}/projects`, () => HttpResponse.json([])))
    const { user } = await renderSidebar(true)

    expect(screen.getByText("You have no projects yet")).toBeVisible()
    expect(screen.getByRole("button", { name: "Create one now!" })).toBeVisible()

    await user.click(screen.getByRole("button", { name: "Create one now!" }))
    expect(screen.getByRole("dialog", { name: "Add project" })).toBeVisible()
  })

  test("renders correctly when there's error", async () => {
    server.use(
      http.get(`${API_BASE_URL}/projects`, () => HttpResponse.json({ error: "Something went wrong" }, { status: 500 })),
    )
    vi.spyOn(console, "error").mockImplementation(() => undefined)
    await renderSidebar(true)

    expect(screen.getByText("Something went wrong, try again later")).toBeVisible()
    expect(screen.getByRole("button", { name: "Try again" })).toBeVisible()
    expect(screen.queryByRole("link", { name: "Music" })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Fitness" })).not.toBeInTheDocument()
  })

  test("renders project skeleton UI and spinner while fetching", async () => {
    server.use(http.get(`${API_BASE_URL}/projects`, async () => await delay("infinite")))
    await renderSidebar()

    expect(within(projectsContainer()).getByRole("progressbar")).toBeVisible()
    expect(within(projectsContainer()).getAllByTestId("project-skeleton")).toHaveLength(3)
  })

  test("add project button should open up a dialog form to add project", async () => {
    const { user } = await renderSidebar()

    await user.click(addProjectBtn())

    expect(screen.getByRole("dialog", { name: "Add project" })).toBeVisible()
  })

  test("project accordion toggle project list", async () => {
    const { user } = await renderSidebar()

    await user.click(toggleProjectListBtn())

    expect(screen.queryByRole("link", { name: "Music" })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Fitness" })).not.toBeInTheDocument()
  })
})
