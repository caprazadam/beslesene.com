import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, AlertTriangle } from "lucide-react"
import { AdminMetricCard } from "@/components/admin/admin-metric-card"
import { AdminRecentUsers } from "@/components/admin/admin-recent-users"
import { AdminRecentWithdrawals } from "@/components/admin/admin-recent-withdrawals"
import { AdminActivityChart } from "@/components/admin/admin-activity-chart"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your game platform and key metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          title="Total Users"
          value="12,345"
          description="+15% from last month"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <AdminMetricCard
          title="Active Users"
          value="8,723"
          description="+5% from last week"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <AdminMetricCard
          title="Revenue"
          value="$5,240"
          description="+12% from last month"
          trend="up"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <AdminMetricCard
          title="Pending Withdrawals"
          value="23"
          description="+3 from yesterday"
          trend="up"
          icon={<AlertTriangle className="h-4 w-4" />}
          trendColor="text-amber-500"
        />
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Daily active users over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminActivityChart />
        </CardContent>
      </Card>

      {/* Recent Activity Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
          <TabsTrigger value="withdrawals">Recent Withdrawals</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <AdminRecentUsers />
        </TabsContent>
        <TabsContent value="withdrawals" className="space-y-4">
          <AdminRecentWithdrawals />
        </TabsContent>
      </Tabs>
    </div>
  )
}
