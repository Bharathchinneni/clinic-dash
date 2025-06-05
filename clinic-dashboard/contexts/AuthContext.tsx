"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "manage-team" | "org-admin" | "branch-admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  orgId?: string
  branchId?: string
}

export interface Organisation {
  id: string
  name: string
  legalEntity: string
  address: string
  contactPhone: string
  contactEmail: string
  contractStart: string
  contractEnd: string
  adminEmail: string
  status: "active" | "inactive"
}

export interface Branch {
  id: string
  orgId: string
  name: string
  city: string
  timezone: string
  address: string
  phone: string
  adminEmail: string
  status: "active" | "inactive"
}

interface AuthContextType {
  user: User | null
  organisations: Organisation[]
  branches: Branch[]
  currentOrg: Organisation | null
  currentBranch: Branch | null
  setCurrentOrg: (org: Organisation | null) => void
  setCurrentBranch: (branch: Branch | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  createOrganisation: (org: Omit<Organisation, "id" | "status">) => Promise<void>
  createBranch: (branch: Omit<Branch, "id" | "status">) => Promise<void>
  updateBranch: (branchId: string, updates: Partial<Branch>) => Promise<void>
  redirectToRoleDashboard: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock data for demonstration
const mockOrganisations: Organisation[] = [
  {
    id: "org-1",
    name: "Live Well Healthcare",
    legalEntity: "Live Well Healthcare Pvt Ltd",
    address: "Kukatpally, Hyderabad 500072",
    contactPhone: "+91 9876543210",
    contactEmail: "admin@livewell.com",
    contractStart: "2024-01-01",
    contractEnd: "2025-12-31",
    adminEmail: "admin@livewell.com",
    status: "active",
  },
]

const mockBranches: Branch[] = [
  {
    id: "branch-1",
    orgId: "org-1",
    name: "Kukatpally Branch",
    city: "Hyderabad",
    timezone: "Asia/Kolkata",
    address: "Plot 123, Kukatpally, Hyderabad 500072",
    phone: "+91 9876543210",
    adminEmail: "kukatpally@livewell.com",
    status: "active",
  },
  {
    id: "branch-2",
    orgId: "org-1",
    name: "Gachibowli Branch",
    city: "Hyderabad",
    timezone: "Asia/Kolkata",
    address: "Plot 456, Gachibowli, Hyderabad 500032",
    phone: "+91 9876543211",
    adminEmail: "gachibowli@livewell.com",
    status: "active",
  },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations)
  const [branches, setBranches] = useState<Branch[]>(mockBranches)
  const [currentOrg, setCurrentOrg] = useState<Organisation | null>(null)
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null)

  useEffect(() => {
    // Mock authentication check
    const mockUser: User = {
      id: "user-1",
      email: "admin@livewell.com",
      name: "Varun",
      role: "manage-team",
      orgId: "org-1",
    }
    setUser(mockUser)
    setCurrentOrg(mockOrganisations[0])
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login logic
    const mockUser: User = {
      id: "user-1",
      email,
      name: "Varun",
      role: email.includes("manage") ? "manage-team" : email.includes("branch") ? "branch-admin" : "org-admin",
      orgId: "org-1",
      branchId: email.includes("branch") ? "branch-1" : undefined,
    }
    setUser(mockUser)
  }

  const logout = () => {
    setUser(null)
    setCurrentOrg(null)
    setCurrentBranch(null)
  }

  const createOrganisation = async (orgData: Omit<Organisation, "id" | "status">) => {
    const newOrg: Organisation = {
      ...orgData,
      id: `org-${Date.now()}`,
      status: "active",
    }
    setOrganisations((prev) => [...prev, newOrg])

    // Mock: Send invite email to org admin
    console.log(`Invite email sent to ${orgData.adminEmail}`)
  }

  const createBranch = async (branchData: Omit<Branch, "id" | "status">) => {
    const newBranch: Branch = {
      ...branchData,
      id: `branch-${Date.now()}`,
      status: "active",
    }
    setBranches((prev) => [...prev, newBranch])

    // Mock: Send invite email to branch admin
    console.log(`Invite email sent to ${branchData.adminEmail}`)
  }

  const updateBranch = async (branchId: string, updates: Partial<Branch>) => {
    setBranches((prev) => prev.map((branch) => (branch.id === branchId ? { ...branch, ...updates } : branch)))
  }

  const redirectToRoleDashboard = () => {
    if (typeof window !== 'undefined' && user) {
      switch (user.role) {
        case 'manage-team':
          window.location.href = '/manage'
          break
        case 'org-admin':
          window.location.href = `/org/${user.orgId}/dashboard`
          break
        case 'branch-admin':
          window.location.href = `/org/${user.orgId}/branch/${user.branchId}/dashboard`
          break
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        organisations,
        branches,
        currentOrg,
        currentBranch,
        setCurrentOrg,
        setCurrentBranch,
        login,
        logout,
        createOrganisation,
        createBranch,
        updateBranch,
        redirectToRoleDashboard,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
