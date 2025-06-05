"use client"

import React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import {
  BarChart3,
  Building,
  CalendarClock,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface BranchDashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Sessions",
    icon: CalendarClock,
    href: "/sessions",
  },
  {
    title: "Therapists",
    icon: Stethoscope,
    href: "/therapists",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/patients",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    title: "Reporting",
    icon: BarChart3,
    href: "/reporting",
  },
]

export default function BranchDashboardLayout({ children, activeTab }: BranchDashboardLayoutProps) {
  const { user, logout, currentBranch, currentOrg } = useAuth()
  const params = useParams()
  const pathname = usePathname()
  const orgId = params?.orgId as string
  const branchId = params?.branchId as string

  const getHref = (item: { href: string }) => {
    return `/org/${orgId}/branch/${branchId}${item.href}`
  }

  const isActive = (item: { title: string; href: string }) => {
    if (activeTab) {
      return activeTab === item.title
    }
    return pathname?.includes(item.href)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex w-full">
        <Sidebar className="border-r border-amber-200">
          <SidebarHeader className="border-b border-amber-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-amber-800">{currentBranch?.name}</h2>
                <p className="text-xs text-amber-600">Branch Admin</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-amber-700">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item)}
                        className={`w-full justify-start ${
                          isActive(item)
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                        }`}
                      >
                        <Link href={getHref(item)}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-amber-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-amber-800">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800">{user?.name}</p>
                  <p className="text-xs text-amber-600">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-amber-600 hover:text-amber-800" />
                <div>
                  <h1 className="text-xl font-semibold text-amber-800">
                    {activeTab || "Dashboard"}
                  </h1>
                  <p className="text-sm text-amber-600">
                    {currentBranch?.name} - {currentOrg?.name}
                  </p>
                </div>
              </div>
              <Link href={`/org/${orgId}/dashboard`}>
                <Button variant="outline" size="sm" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                  Back to Organization
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
} 