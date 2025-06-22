import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router"
import { render, waitFor } from "@testing-library/react"

const router = createRouter({
  routeTree: createRootRoute(),
})

export async function renderComponent(component: JSX.Element) {
  const result = render(<RouterProvider router={router} defaultComponent={() => component} />)
  // https://github.com/TanStack/router/issues/1654
  await waitFor(() => result.baseElement.childNodes[0]!.hasChildNodes())
}

export function TestQueryClient({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
