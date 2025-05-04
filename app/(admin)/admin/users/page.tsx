import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUserManagement } from "@/components/admin/admin-user-management"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage users, roles, and permissions.</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <AdminUserManagement filterStatus={null} />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <AdminUserManagement filterStatus="active" />
        </TabsContent>
        <TabsContent value="suspended" className="space-y-4">
          <AdminUserManagement filterStatus="suspended" />
        </TabsContent>
        <TabsContent value="premium" className="space-y-4">
          <AdminUserManagement filterStatus={null} filterRole="premium" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
