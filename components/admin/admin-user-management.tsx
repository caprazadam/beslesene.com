"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ban, Check, Edit, MoreHorizontal, Plus, Search, Shield, Trash, User } from "lucide-react"

interface AdminUserManagementProps {
  filterStatus: string | null
  filterRole?: string
}

export function AdminUserManagement({ filterStatus, filterRole }: AdminUserManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Sample user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-05-01",
      besCoins: 1250,
      lastLogin: "2023-05-03",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
      role: "premium",
      joinDate: "2023-04-15",
      besCoins: 3500,
      lastLogin: "2023-05-03",
      location: "London, UK",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      status: "suspended",
      role: "user",
      joinDate: "2023-03-22",
      besCoins: 750,
      lastLogin: "2023-04-10",
      location: "Toronto, Canada",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "active",
      role: "premium",
      joinDate: "2023-05-10",
      besCoins: 2800,
      lastLogin: "2023-05-03",
      location: "Sydney, Australia",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-04-28",
      besCoins: 950,
      lastLogin: "2023-05-02",
      location: "Berlin, Germany",
    },
    {
      id: 6,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "suspended",
      role: "premium",
      joinDate: "2023-03-15",
      besCoins: 1800,
      lastLogin: "2023-04-05",
      location: "Paris, France",
    },
    {
      id: 7,
      name: "David Brown",
      email: "david.brown@example.com",
      status: "active",
      role: "user",
      joinDate: "2023-04-10",
      besCoins: 650,
      lastLogin: "2023-05-01",
      location: "Tokyo, Japan",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      status: "active",
      role: "premium",
      joinDate: "2023-05-05",
      besCoins: 4200,
      lastLogin: "2023-05-03",
      location: "Madrid, Spain",
    },
  ]

  // Filter users based on search query and filters
  const filteredUsers = users.filter(
    (user) =>
      (searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === null || user.status === filterStatus) &&
      (filterRole === undefined || user.role === filterRole),
  )

  const handleEditUser = (user: any) => {
    setCurrentUser(user)
    setShowEditDialog(true)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-9 w-full sm:w-[300px] md:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>BesCoins</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/abstract-geometric-shapes.png?key=8dwdm&height=36&width=36&query=user ${user.name}`}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {user.status === "active" ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : (
                          <Ban className="mr-1 h-3 w-3" />
                        )}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.role === "premium"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {user.role === "premium" ? (
                          <Shield className="mr-1 h-3 w-3" />
                        ) : (
                          <User className="mr-1 h-3 w-3" />
                        )}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center mr-1">
                          <span className="text-[8px] text-white font-bold">B</span>
                        </div>
                        {user.besCoins.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
                            {user.status === "active" ? "Suspend User" : "Activate User"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {currentUser && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Make changes to the user account. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={currentUser.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" defaultValue={currentUser.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={currentUser.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={currentUser.role}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bescoins" className="text-right">
                  BesCoins
                </Label>
                <Input id="bescoins" type="number" defaultValue={currentUser.besCoins} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditDialog(false)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
