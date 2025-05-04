"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, CreditCard, Eye, MoreHorizontal, Search, User, XCircle } from "lucide-react"

export function AdminRecentWithdrawals() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample withdrawal data
  const withdrawals = [
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      amount: 500,
      besCoins: 5000,
      method: "Bank Transfer",
      status: "pending",
      date: "2023-05-01",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      amount: 100,
      besCoins: 1000,
      method: "PayPal",
      status: "approved",
      date: "2023-04-28",
    },
    {
      id: 3,
      user: {
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
      },
      amount: 250,
      besCoins: 2500,
      method: "Bank Transfer",
      status: "rejected",
      date: "2023-04-25",
    },
    {
      id: 4,
      user: {
        name: "Emily Davis",
        email: "emily.davis@example.com",
      },
      amount: 300,
      besCoins: 3000,
      method: "PayPal",
      status: "pending",
      date: "2023-05-02",
    },
    {
      id: 5,
      user: {
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
      },
      amount: 150,
      besCoins: 1500,
      method: "Bank Transfer",
      status: "approved",
      date: "2023-04-30",
    },
  ]

  // Filter withdrawals based on search query
  const filteredWithdrawals = withdrawals.filter(
    (withdrawal) =>
      withdrawal.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.method.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Recent Withdrawals</CardTitle>
          <CardDescription>Manage withdrawal requests from users.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search withdrawals..."
              className="pl-9 w-[200px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
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
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?key=n3s05&height=36&width=36&query=user ${withdrawal.user.name}`}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {withdrawal.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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
  )
}
