"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building, Plus, MapPin, Phone, Mail, Edit, Settings } from "lucide-react"

export default function BranchesTable() {
  const router = useRouter()
  const { branches, currentOrg, createBranch } = useAuth()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    timezone: "Asia/Kolkata",
    address: "",
    phone: "",
    adminEmail: "",
  })

  const orgBranches = branches.filter(branch => branch.orgId === currentOrg?.id)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentOrg) return

    setIsLoading(true)
    try {
      await createBranch({
        ...formData,
        orgId: currentOrg.id,
      })
      setIsCreateDialogOpen(false)
      setFormData({
        name: "",
        city: "",
        timezone: "Asia/Kolkata",
        address: "",
        phone: "",
        adminEmail: "",
      })
    } catch (error) {
      console.error("Error creating branch:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBranchClick = (branchId: string) => {
    router.push(`/org/${currentOrg?.id}/branch/${branchId}/dashboard`)
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-amber-800">Branch Management</h3>
          <p className="text-amber-600 text-sm">
            Manage branches for {currentOrg?.name}
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-amber-800">Create New Branch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-amber-800">
                    Branch Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Kukatpally Branch"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-amber-800">
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Hyderabad"
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
                  placeholder="Full branch address"
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-amber-800">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                    className="border-amber-200 focus:border-amber-500"
                  />
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
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-amber-300 text-amber-600 hover:bg-amber-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {isLoading ? "Creating..." : "Create Branch"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {orgBranches.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Building className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-800 mb-2">No branches yet</h3>
            <p className="text-amber-600 mb-4">
              Create your first branch to start managing locations
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Branch
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-amber-200">
                  <TableHead className="text-amber-800">Branch Name</TableHead>
                  <TableHead className="text-amber-800">Location</TableHead>
                  <TableHead className="text-amber-800">Contact</TableHead>
                  <TableHead className="text-amber-800">Admin</TableHead>
                  <TableHead className="text-amber-800">Status</TableHead>
                  <TableHead className="text-amber-800">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orgBranches.map((branch) => (
                  <TableRow 
                    key={branch.id} 
                    className="border-amber-100 hover:bg-amber-50 cursor-pointer"
                    onClick={() => handleBranchClick(branch.id)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Building className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-medium text-amber-800">{branch.name}</div>
                          <div className="text-xs text-amber-600">{branch.timezone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-amber-600">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">{branch.city}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-amber-600">
                        <Phone className="h-3 w-3" />
                        <span className="text-sm">{branch.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-amber-600">
                        <Mail className="h-3 w-3" />
                        <span className="text-sm">{branch.adminEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={branch.status === "active" ? "default" : "secondary"}
                        className={
                          branch.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {branch.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBranchClick(branch.id)
                          }}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 