"use client"

import { useAuth } from '../../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ManagePage() {
  const { user, organisations } = useAuth()

  if (user?.role !== 'manage-team') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-amber-800">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-600">You don't have permission to access the management portal.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="absolute inset-0 pointer-events-none bg-noise bg-repeat opacity-20 mix-blend-overlay" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-800">Organisation Management</h1>
            <p className="text-amber-600 mt-2">Manage healthcare organisations and their contracts</p>
          </div>
          <Link href="/manage/organisations/new">
            <Button className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Organisation
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Preview card for testing */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Building2 className="h-5 w-5" />
                Acme Therapy Group
              </CardTitle>
              <p className="text-sm text-amber-600">Preview Organisation</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-amber-600" />
                  <span>3 Branches</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span>Contract: 2024-2025</span>
                </div>
                <div className="pt-2">
                  <Link href="/org/1/dashboard">
                    <Button variant="outline" className="w-full">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real organisations */}
          {organisations.map((org) => (
            <Card key={org.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Building2 className="h-5 w-5" />
                  {org.name}
                </CardTitle>
                <p className="text-sm text-amber-600">{org.legalEntity}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-amber-600" />
                    <span>Admin: {org.adminEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span>Contract: {org.contractStart} - {org.contractEnd}</span>
                  </div>
                  <div className="pt-2">
                    <Link href={`/org/${org.id}/dashboard`}>
                      <Button variant="outline" className="w-full">
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {organisations.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg col-span-full">
              <CardContent className="text-center py-8">
                <Building2 className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-amber-800 mb-2">No Organisations Yet</h3>
                <p className="text-amber-600 mb-4">Create your first organisation to get started</p>
                <Link href="/manage/organisations/new">
                  <Button className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Organisation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
