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
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, CreditCard, Eye, MoreHorizontal, Search, User, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AdminWithdrawalManagementProps {
  filterStatus: string | null
}

export function AdminWithdrawalManagement({ filterStatus }: AdminWithdrawalManagementProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [currentWithdrawal, setCurrentWithdrawal] = useState<any>(null)

  // Sample withdrawal data
  const withdrawals = [
    {
      id: 1,
      user: {
        id: 101,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      amount: 500,
      besCoins: 5000,
      method: "Bank Transfer",
      accountDetails: "Bank: Example Bank\nAccount: XXXX-XXXX-XXXX-1234\nName: John Doe",
      status: "pending",
      date: "2023-05-01",
      notes: "",
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      amount: 100,
      besCoins: 1000,
      method: "PayPal",
      accountDetails: "PayPal: jane.smith@example.com",
      status: "approved",
      date: "2023-04-28",
      processedDate: "2023-04-29",
      processedBy: "Admin User",
      notes: "Processed via PayPal",
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
      },
      amount: 250,
      besCoins: 2500,
      method: "Bank Transfer",
      accountDetails: "Bank: Global Bank\nAccount: XXXX-XXXX-XXXX-5678\nName: Robert Johnson",
      status: "rejected",
      date: "2023-04-25",
      processedDate: "2023-04-26",
      processedBy: "Admin User",
      notes: "Insufficient account verification",
    },
    {
      id: 4,
      user: {
        id: 104,
        name: "Emily Davis",
        email: "emily.davis@example.com",
      },
      amount: 300,
      besCoins: 3000,
      method: "PayPal",
      accountDetails: "PayPal: emily.davis@example.com",
      status: "pending",
      date: "2023-05-02",
      notes: "",
    },
    {
      id: 5,
      user: {
        id: 105,
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
      },
      amount: 150,
      besCoins: 1500,
      method: "Bank Transfer",
      accountDetails: "Bank: City Bank\nAccount: XXXX-XXXX-XXXX-9012\nName: Michael Wilson",
      status: "approved",
      date: "2023-04-30",
      processedDate: "2023-05-01",
      processedBy: "Admin User",
      notes: "Regular customer",
    },
    {
      id: 6,
      user: {
        id: 106,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
      },
      amount: 200,
      besCoins: 2000,
      method: "PayPal",
      accountDetails: "PayPal: sarah.johnson@example.com",
      status: "pending",
      date: "2023-05-03",
      notes: "",
    },
    {
      id: 7,
      user: {
        id: 107,
        name: "David Brown",
        email: "david.brown@example.com",
      },
      amount: 450,
      besCoins: 4500,
      method: "Bank Transfer",
      accountDetails: "Bank: National Bank\nAccount: XXXX-XXXX-XXXX-3456\nName: David Brown",
      status: "rejected",
      date: "2023-04-27",
      processedDate: "2023-04-28",
      processedBy: "Admin User",
      notes: "Account information mismatch",
    },
    {
      id: 8,
      user: {
        id: 108,
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
      },
      amount: 350,
      besCoins: 3500,
      method: "PayPal",
      accountDetails: "PayPal: lisa.anderson@example.com",
      status: "approved",
      date: "2023-04-29",
      processedDate: "2023-04-30",
      processedBy: "Admin User",
      notes: "Premium user",
    },
  ]

  // Filter withdrawals based on search query and status filter
  const filteredWithdrawals = withdrawals.filter(
    (withdrawal) =>
      (searchQuery === "" ||
        withdrawal.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        withdrawal.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        withdrawal.method.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === null || withdrawal.status === filterStatus),
  )

  const handleViewDetails = (withdrawal: any) => {
    setCurrentWithdrawal(withdrawal)
    setShowDetailsDialog(true)
  }

  const handleApproveWithdrawal = (withdrawal: any) => {
    setCurrentWithdrawal(withdrawal)
    setShowApproveDialog(true)
  }

  const handleRejectWithdrawal = (withdrawal: any) => {
    setCurrentWithdrawal(withdrawal)
    setShowRejectDialog(true)
  }

  const confirmApprove = () => {
    // Here you would implement the actual approval logic
    toast({
      title: "Withdrawal approved",
      description: `Withdrawal request #${currentWithdrawal.id} has been approved.`,
    })
    setShowApproveDialog(false)
  }

  const confirmReject = () => {
    // Here you would implement the actual rejection logic
    toast({
      title: "Withdrawal rejected",
      description: `Withdrawal request #${currentWithdrawal.id} has been rejected.`,
    })
    setShowRejectDialog(false)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search withdrawals..."
            className="pl-9 w-full sm:w-[300px] md:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell>#{withdrawal.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/abstract-geometric-shapes.png?key=ffdkj&height=36&width=36&query=user ${withdrawal.user.name}`}
                            alt={withdrawal.user.name}
                          />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{withdrawal.user.name}</div>
                          <div className="text-sm text-muted-foreground">{withdrawal.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${withdrawal.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <div className="h-3 w-3 rounded-full bg-amber-500 flex items-center justify-center mr-1">
                            <span className="text-[6px] text-white font-bold">B</span>
                          </div>
                          {withdrawal.besCoins.toLocaleString()} BesCoins
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        {withdrawal.method}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          withdrawal.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : withdrawal.status === "pending"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {withdrawal.status === "approved" ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : withdrawal.status === "pending" ? (
                          <CreditCard className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(withdrawal)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {withdrawal.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => handleApproveWithdrawal(withdrawal)}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleRejectWithdrawal(withdrawal)}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* View Details Dialog */}
      {currentWithdrawal && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Withdrawal Request Details</DialogTitle>
              <DialogDescription>Withdrawal request #{currentWithdrawal.id} details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">User:</Label>
                <div className="col-span-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?key=websq&height=24&width=24&query=user ${currentWithdrawal.user.name}`}
                      alt={currentWithdrawal.user.name}
                    />
                    <AvatarFallback>
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span>{currentWithdrawal.user.name}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Email:</Label>
                <div className="col-span-2">{currentWithdrawal.user.email}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Amount:</Label>
                <div className="col-span-2">${currentWithdrawal.amount.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">BesCoins:</Label>
                <div className="col-span-2 flex items-center">
                  <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center mr-1">
                    <span className="text-[8px] text-white font-bold">B</span>
                  </div>
                  {currentWithdrawal.besCoins.toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Method:</Label>
                <div className="col-span-2">{currentWithdrawal.method}</div>
              </div>
              <div className="grid grid-cols-3 items-start gap-4">
                <Label className="text-right font-medium">Account Details:</Label>
                <div className="col-span-2 whitespace-pre-line">{currentWithdrawal.accountDetails}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Status:</Label>
                <div className="col-span-2">
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      currentWithdrawal.status === "approved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : currentWithdrawal.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {currentWithdrawal.status === "approved" ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : currentWithdrawal.status === "pending" ? (
                      <CreditCard className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {currentWithdrawal.status.charAt(0).toUpperCase() + currentWithdrawal.status.slice(1)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Request Date:</Label>
                <div className="col-span-2">{new Date(currentWithdrawal.date).toLocaleDateString()}</div>
              </div>
              {currentWithdrawal.processedDate && (
                <>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right font-medium">Processed Date:</Label>
                    <div className="col-span-2">{new Date(currentWithdrawal.processedDate).toLocaleDateString()}</div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right font-medium">Processed By:</Label>
                    <div className="col-span-2">{currentWithdrawal.processedBy}</div>
                  </div>
                </>
              )}
              {currentWithdrawal.notes && (
                <div className="grid grid-cols-3 items-start gap-4">
                  <Label className="text-right font-medium">Notes:</Label>
                  <div className="col-span-2">{currentWithdrawal.notes}</div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Dialog */}
      {currentWithdrawal && (
        <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Withdrawal</DialogTitle>
              <DialogDescription>Are you sure you want to approve this withdrawal request?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">User:</span>
                <span>{currentWithdrawal.user.name}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Amount:</span>
                <span>${currentWithdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Method:</span>
                <span>{currentWithdrawal.method}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="approval-notes">Notes (Optional)</Label>
                <Textarea id="approval-notes" placeholder="Add any notes about this approval" />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve Withdrawal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {currentWithdrawal && (
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Withdrawal</DialogTitle>
              <DialogDescription>Are you sure you want to reject this withdrawal request?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">User:</span>
                <span>{currentWithdrawal.user.name}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Amount:</span>
                <span>${currentWithdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Method:</span>
                <span>{currentWithdrawal.method}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide a reason for rejecting this withdrawal request"
                  required
                />
                <p className="text-xs text-muted-foreground">This reason will be shared with the user.</p>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmReject} variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Reject Withdrawal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
