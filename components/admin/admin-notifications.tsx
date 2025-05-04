"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, User, CreditCard, Bell, CheckCircle2 } from "lucide-react"

interface AdminNotificationsProps {
  onClose: () => void
}

export function AdminNotifications({ onClose }: AdminNotificationsProps) {
  const notifications = [
    {
      id: 1,
      title: "New Withdrawal Request",
      message: "User johndoe123 has requested a withdrawal of 500 BesCoins",
      time: "5 minutes ago",
      type: "withdrawal",
      read: false,
    },
    {
      id: 2,
      title: "New User Registration",
      message: "User sarahsmith has joined Beslesene.com",
      time: "1 hour ago",
      type: "user",
      read: false,
    },
    {
      id: 3,
      title: "System Alert",
      message: "Daily user activity report is ready for review",
      time: "3 hours ago",
      type: "system",
      read: true,
    },
    {
      id: 4,
      title: "Payment Processed",
      message: "Payment to vendor for premium services has been processed",
      time: "Yesterday",
      type: "payment",
      read: true,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "withdrawal":
        return <CreditCard className="h-5 w-5 text-amber-500" />
      case "user":
        return <User className="h-5 w-5 text-blue-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "payment":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="absolute right-4 top-16 w-80 z-50 p-0 shadow-lg">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b last:border-b-0 hover:bg-muted/50 ${!notification.read ? "bg-primary/5" : ""}`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t">
        <Button variant="ghost" className="w-full text-sm h-8">
          Mark all as read
        </Button>
      </div>
    </Card>
  )
}
