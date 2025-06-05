"use client"

import ClinicDashboard from '../../../../../../clinic-dashboard'

export default function BranchSessionsPage() {
  // For branch admin, sessions are automatically filtered by branch
  // No branch filter dropdown is shown
  return <ClinicDashboard />
}
