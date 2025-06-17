import { createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router"
import { render } from "@testing-library/react"

const router = createRouter({
  routeTree: createRootRoute(),
})

export function renderComponent(component: JSX.Element) {
  // @ts-expect-error There's probably no better way to do this without having typed errors
  render(<RouterProvider router={router} defaultComponent={() => component} />)
}
