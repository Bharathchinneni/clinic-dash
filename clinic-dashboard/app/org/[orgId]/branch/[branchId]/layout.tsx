"use client"

import { useAuth } from '../../../../../contexts/AuthContext'
import BranchDashboardLayout from '../../../../../layouts/BranchDashboardLayout'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, branches, setCurrentBranch } = useAuth()
  const params = useParams()
  const pathname = usePathname()
  const branchId = params.branchId as string

  useEffect(() => {
    if (branchId && branches.length > 0) {
      const branch = branches.find(b => b.id === branchId)
      if (branch) {
        setCurrentBranch(branch)
      }
    }
  }, [branchId, branches, setCurrentBranch])

  // Determine active tab from pathname
  let activeTab = "Dashboard"
  if (pathname.includes('/sessions')) {
    activeTab = "Sessions"
  } else if (pathname.includes('/therapists')) {
    activeTab = "Therapists"
  } else if (pathname.includes('/patients')) {
    activeTab = "Patients"
  } else if (pathname.includes('/billing')) {
    activeTab = "Billing"
  } else if (pathname.includes('/reporting')) {
    activeTab = "Reporting"
  }

  if (user?.role !== 'branch-admin' && user?.role !== 'org-admin' && user?.role !== 'manage-team') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-amber-800">Access Denied</div>
      </div>
    )
  }

  return (
    <BranchDashboardLayout activeTab={activeTab}>
      {children}
    </BranchDashboardLayout>
  )
}
