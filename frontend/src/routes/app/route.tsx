import { AppSidebar } from "@core/components/AppSidebar/AppSidebar"
import { Header } from "@core/components/Header/Header"
import { PageContainer } from "@core/components/PageContainer"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SidebarInset, SidebarProvider } from "@ui/sidebar"

export const Route = createFileRoute("/app")({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  )
}
