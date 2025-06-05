"use client"

import { useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Clock, User, MapPin, Plus } from "lucide-react"

// Mock session data
const mockSessions = [
  {
    id: "session-1",
    patientName: "John Doe",
    therapistName: "Dr. Smith",
    branchId: "branch-1",
    branchName: "Kukatpally Branch",
    date: "2024-12-18",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "scheduled",
    type: "Physical Therapy"
  },
  {
    id: "session-2",
    patientName: "Jane Smith",
    therapistName: "Dr. Johnson",
    branchId: "branch-1",
    branchName: "Kukatpally Branch",
    date: "2024-12-18",
    time: "11:30 AM",
    duration: "45 minutes",
    status: "completed",
    type: "Occupational Therapy"
  },
  {
    id: "session-3",
    patientName: "Mike Wilson",
    therapistName: "Dr. Brown",
    branchId: "branch-2",
    branchName: "Gachibowli Branch",
    date: "2024-12-18",
    time: "2:00 PM",
    duration: "60 minutes",
    status: "scheduled",
    type: "Speech Therapy"
  }
]

export default function ClinicDashboard() {
  const { currentBranch, currentOrg } = useAuth()
  const [sessions] = useState(mockSessions)

  // Filter sessions based on current context
  const filteredSessions = currentBranch 
    ? sessions.filter(session => session.branchId === currentBranch.id)
    : sessions.filter(session => 
        // If viewing from org level, show all sessions from org's branches
        currentOrg && mockSessions.some(s => s.branchId.startsWith('branch-'))
      )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-amber-800">Sessions Management</h3>
          <p className="text-amber-600 text-sm">
            {currentBranch 
              ? `Sessions for ${currentBranch.name}` 
              : `All sessions across ${currentOrg?.name} branches`
            }
          </p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <CalendarClock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-amber-800">{session.patientName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-amber-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{session.therapistName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.date} at {session.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{session.branchName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(session.status)}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-800">{session.duration}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredSessions.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <CalendarClock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-800 mb-2">No sessions found</h3>
              <p className="text-amber-600 mb-4">
                {currentBranch 
                  ? `No sessions scheduled for ${currentBranch.name}` 
                  : 'No sessions found across your branches'
                }
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Schedule First Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 