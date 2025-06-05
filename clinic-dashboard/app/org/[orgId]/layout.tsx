"use client"

import { useAuth } from '../../../contexts/AuthContext'
import OrgDashboardLayout from '../../../layouts/OrgDashboardLayout'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, organisations, setCurrentOrg } = useAuth()
  const params = useParams()
  const pathname = usePathname()
  const orgId = params?.orgId as string

  useEffect(() => {
    if (orgId && organisations.length > 0) {
      const org = organisations.find(o => o.id === orgId)
      if (org) {
        setCurrentOrg(org)
      }
    }
  }, [orgId, organisations, setCurrentOrg])

  // Determine active tab from pathname
  let activeTab = "Dashboard"
  if (pathname?.includes('/branches')) {
    activeTab = "Branches"
  } else if (pathname?.includes('/sessions')) {
    activeTab = "Sessions"
  } else if (pathname?.includes('/therapists')) {
    activeTab = "Therapists"
  } else if (pathname?.includes('/patients')) {
    activeTab = "Patients"
  } else if (pathname?.includes('/billing')) {
    activeTab = "Billing"
  } else if (pathname?.includes('/reporting')) {
    activeTab = "Reporting"
  }

  if (user?.role !== 'org-admin' && user?.role !== 'manage-team') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-amber-800">Access Denied</div>
      </div>
    )
  }

  return (
    <OrgDashboardLayout activeTab={activeTab}>
      {children}
    </OrgDashboardLayout>
  )
}
