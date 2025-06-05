"use client"

import { useAuth } from "../contexts/AuthContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SessionsBranchFilterProps {
  selectedBranch: string | null
  onBranchChange: (branchId: string | null) => void
}

export default function SessionsBranchFilter({ 
  selectedBranch, 
  onBranchChange 
}: SessionsBranchFilterProps) {
  const { branches, currentOrg } = useAuth()
  
  const orgBranches = branches.filter(branch => branch.orgId === currentOrg?.id)

  return (
    <div className="w-64">
      <Select 
        value={selectedBranch || "all"} 
        onValueChange={(value) => onBranchChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-amber-200">
          <SelectValue placeholder="Filter by branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>
          {orgBranches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 