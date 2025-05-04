"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function AdminAnnouncementManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState<any>(null)

  // Sample announcement data
  const announcements = [
    {
      id: 1,
      title: "Welcome to the New Version!",
      content: "We're excited to announce the launch of our new version with improved features and performance.",
      type: "info",
      target: "all",
      active: true,
      startDate: "2023-05-01",
      endDate: "2023-05-15",
      createdBy: "Admin User",
      createdAt: "2023-04-28",
    },
    {
      id: 2,
      title: "Scheduled Maintenance",
      content: "We will be performing scheduled maintenance on May 10th from 2:00 AM to 4:00 AM UTC.",
      type: "warning",
      target: "all",
      active: true,
      startDate: "2023-05-08",
      endDate: "2023-05-10",
      createdBy: "Admin User",
      createdAt: "2023-05-01",
    },
    {
      id: 3,
      title: "New Premium Features",
      content: "Premium users can now access exclusive new features including advanced analytics and priority support.",
      type: "info",
      target: "premium",
      active: true,
      startDate: "2023-05-05",
      endDate: "2023-06-05",
      createdBy: "Admin User",
      createdAt: "2023-05-03",
    },
    {
      id: 4,
      title: "Holiday Event",
      content: "Join our special holiday event and earn double BesCoins on all activities!",
      type: "success",
      target: "all",
      active: false,
      startDate: "2023-12-20",
      endDate: "2023-12-31",
      createdBy: "Admin User",
      createdAt: "2023-05-02",
    },
    {
      id: 5,
      title: "Important Security Update",
      content: "We've updated our security protocols. Please review your account settings.",
      type: "error",
      target: "all",
      active: true,
      startDate: "2023-05-02",
      endDate: "2023-05-09",
      createdBy: "Admin User",
      createdAt: "2023-05-02",
    },
  ]

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateAnnouncement = () => {
    setShowCreateDialog(true)
  }

  const handleEditAnnouncement = (announcement: any) => {
    setCurrentAnnouncement(announcement)
    setShowEditDialog(true)
  }

  const handleDeleteAnnouncement = (announcement: any) => {
    setCurrentAnnouncement(announcement)
    setShowDeleteDialog(true)
  }

  const confirmCreate = () => {
    // Here you would implement the actual creation logic
    toast({
      title: "Announcement created",
      description: "The announcement has been created successfully.",
    })
    setShowCreateDialog(false)
  }

  const confirmEdit = () => {
    // Here you would implement the actual edit logic
    toast({
      title: "Announcement updated",
      description: `Announcement "${currentAnnouncement.title}" has been updated.`,
    })
    setShowEditDialog(false)
  }

  const confirmDelete = () => {
    // Here you would implement the actual delete logic
    toast({
      title: "Announcement deleted",
      description: `Announcement "${currentAnnouncement.title}" has been deleted.`,
    })
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>Announcements</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search announcements..."
                className="pl-9 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateAnnouncement}>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {announcement.content}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          announcement.type === "info"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : announcement.type === "warning"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : announcement.type === "success"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        {announcement.target === "all" ? "All Users" : "Premium Users"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch checked={announcement.active} disabled />
                        <span className="ml-2 text-sm">{announcement.active ? "Active" : "Inactive"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(announcement.startDate).toLocaleDateString()} -{" "}
                          {new Date(announcement.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteAnnouncement(announcement)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
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

      {/* Create Announcement Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>Create a new announcement to display to users.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" placeholder="Announcement title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea id="content" placeholder="Announcement content" className="col-span-3" rows={5} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select defaultValue="info">
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Target Users
              </Label>
              <Select defaultValue="all">
                <SelectTrigger id="target" className="col-span-3">
                  <SelectValue placeholder="Select target users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="premium">Premium Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                Start Date
              </Label>
              <Input id="start-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                End Date
              </Label>
              <Input id="end-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Active
              </Label>
              <div className="flex items-center col-span-3">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active" className="ml-2">
                  Make this announcement active
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCreate}>Create Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      {currentAnnouncement && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>Make changes to the announcement.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input id="edit-title" defaultValue={currentAnnouncement.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  defaultValue={currentAnnouncement.content}
                  className="col-span-3"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select defaultValue={currentAnnouncement.type}>
                  <SelectTrigger id="edit-type" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-target" className="text-right">
                  Target Users
                </Label>
                <Select defaultValue={currentAnnouncement.target}>
                  <SelectTrigger id="edit-target" className="col-span-3">
                    <SelectValue placeholder="Select target users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="premium">Premium Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-start-date" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  defaultValue={currentAnnouncement.startDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-end-date" className="text-right">
                  End Date
                </Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  defaultValue={currentAnnouncement.endDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-active" className="text-right">
                  Active
                </Label>
                <div className="flex items-center col-span-3">
                  <Switch id="edit-active" defaultChecked={currentAnnouncement.active} />
                  <Label htmlFor="edit-active" className="ml-2">
                    Make this announcement active
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Announcement Dialog */}
      {currentAnnouncement && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Announcement</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this announcement? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-md border p-4">
                <h4 className="font-medium">{currentAnnouncement.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{currentAnnouncement.content}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
