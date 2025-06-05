"use client"

import { useAuth } from '../../../../../../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Users, Stethoscope, TrendingUp, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'

export default function BranchDashboardPage() {
  const { currentBranch } = useAuth()
  const params = useParams()
  const orgId = params.orgId as string
  const branchId = params.branchId as string

  return (
    <div className="px-6 py-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-amber-800">Branch Dashboard</h3>
        <p className="text-amber-600 text-sm">Overview for {currentBranch?.name}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Today's Sessions</CardTitle>
            <CalendarClock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">8</div>
            <p className="text-xs text-amber-600">
              2 upcoming
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">34</div>
            <p className="text-xs text-amber-600">
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Therapists</CardTitle>
            <Stethoscope className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">5</div>
            <p className="text-xs text-amber-600">
              All active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">₹85K</div>
            <p className="text-xs text-amber-600">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href={`/org/${orgId}/branch/${branchId}/sessions`}>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Manage Sessions
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Patient Records
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Stethoscope className="h-4 w-4 mr-2" />
                Therapist Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-800">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-amber-800">John Doe</div>
                  <div className="text-sm text-amber-600">with Dr. Smith</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-amber-800">10:00 AM</div>
                  <div className="text-xs text-amber-600">60 min</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-amber-800">Jane Roe</div>
                  <div className="text-sm text-amber-600">with Dr. Jones</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-amber-800">11:30 AM</div>
                  <div className="text-xs text-amber-600">45 min</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50">
                <div>
                  <div className="font-medium text-amber-800">Alice Brown</div>
                  <div className="text-sm text-amber-600">with Dr. Lee</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-amber-800">2:00 PM</div>
                  <div className="text-xs text-amber-600">60 min</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
