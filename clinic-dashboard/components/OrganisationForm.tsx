"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, ArrowLeft } from "lucide-react"

export default function OrganisationForm() {
  const router = useRouter()
  const { createOrganisation } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    legalEntity: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    contractStart: "",
    contractEnd: "",
    adminEmail: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createOrganisation(formData)
      router.push("/manage")
    } catch (error) {
      console.error("Error creating organisation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-amber-800">Create New Organisation</CardTitle>
                <p className="text-amber-600 text-sm">
                  Set up a new healthcare organization in the system
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-800">
                    Organisation Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Live Well Healthcare"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalEntity" className="text-amber-800">
                    Legal Entity Name *
                  </Label>
                  <Input
                    id="legalEntity"
                    name="legalEntity"
                    value={formData.legalEntity}
                    onChange={handleInputChange}
                    placeholder="e.g., Live Well Healthcare Pvt Ltd"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-amber-800">
                  Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Full business address"
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-amber-800">
                    Contact Phone *
                  </Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-amber-800">
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractStart" className="text-amber-800">
                    Contract Start Date *
                  </Label>
                  <Input
                    id="contractStart"
                    name="contractStart"
                    type="date"
                    value={formData.contractStart}
                    onChange={handleInputChange}
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractEnd" className="text-amber-800">
                    Contract End Date *
                  </Label>
                  <Input
                    id="contractEnd"
                    name="contractEnd"
                    type="date"
                    value={formData.contractEnd}
                    onChange={handleInputChange}
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-amber-800">
                  Admin Email *
                </Label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
                <p className="text-xs text-amber-600">
                  An invitation will be sent to this email address
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-amber-300 text-amber-600 hover:bg-amber-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {isLoading ? "Creating..." : "Create Organisation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 