"use client"

import { useState } from 'react'
import ClinicDashboard from '../../../../clinic-dashboard'
import SessionsBranchFilter from '../../../../components/SessionsBranchFilter'

export default function OrgSessionsPage() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Inject branch filter into the existing Sessions UI */}
      <div className="absolute top-4 right-6 z-10">
        <SessionsBranchFilter 
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
      </div>
      <ClinicDashboard />
    </div>
  )
}
