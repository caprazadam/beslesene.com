import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUserAnalytics } from "@/components/admin/admin-user-analytics"
import { AdminRevenueAnalytics } from "@/components/admin/admin-revenue-analytics"
import { AdminGameAnalytics } from "@/components/admin/admin-game-analytics"

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and reports for your game.</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="game">Game Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <AdminUserAnalytics />
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <AdminRevenueAnalytics />
        </TabsContent>
        <TabsContent value="game" className="space-y-4">
          <AdminGameAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
