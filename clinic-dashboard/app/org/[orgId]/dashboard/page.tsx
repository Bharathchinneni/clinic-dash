"use client"

import { useAuth } from '../../../../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Users, Stethoscope, Building, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function OrgDashboardPage() {
  const { branches, currentOrg } = useAuth()
  
  const orgBranches = branches.filter(branch => branch.orgId === currentOrg?.id)

  return (
    <div className="px-6 py-4">
      {orgBranches.length === 0 && (
        <div className="mb-6 p-4 bg-amber-100 border border-amber-300 rounded-lg">
          <p className="text-amber-800 font-medium">
            No branches yet – <Link href={`/org/${currentOrg?.id}/branches`} className="underline">click Branches tab</Link> to create your first branch.
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-amber-800">Organisation Overview</h3>
        <p className="text-amber-600 text-sm">Dashboard for {currentOrg?.name}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Branches</CardTitle>
            <Building className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">{orgBranches.length}</div>
            <p className="text-xs text-amber-600">
              {orgBranches.filter(b => b.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Sessions</CardTitle>
            <CalendarClock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">247</div>
            <p className="text-xs text-amber-600">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">89</div>
            <p className="text-xs text-amber-600">
              Across all branches
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">₹2.4L</div>
            <p className="text-xs text-amber-600">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Branch Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-800">Branch Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orgBranches.map((branch) => (
                <div key={branch.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-amber-800">{branch.name}</div>
                    <div className="text-sm text-amber-600">{branch.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-800">45 sessions</div>
                    <div className="text-xs text-amber-600">This month</div>
                  </div>
                </div>
              ))}
              {orgBranches.length === 0 && (
                <div className="text-center py-4 text-amber-600">
                  No branches created yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href={`/org/${currentOrg?.id}/branches`}>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Manage Branches
                </Button>
              </Link>
              <Link href={`/org/${currentOrg?.id}/sessions`}>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  View All Sessions
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Patient Management
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Stethoscope className="h-4 w-4 mr-2" />
                Therapist Management
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
