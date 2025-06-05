"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Role-based redirect
      switch (user.role) {
        case 'manage-team':
          router.push('/manage')
          break
        case 'org-admin':
          router.push(`/org/${user.orgId}/dashboard`)
          break
        case 'branch-admin':
          router.push(`/org/${user.orgId}/branch/${user.branchId}/dashboard`)
          break
        default:
          router.push('/manage')
      }
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-amber-800">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-amber-800">Redirecting...</div>
    </div>
  )
}
