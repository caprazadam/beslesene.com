import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminWithdrawalManagement } from "@/components/admin/admin-withdrawal-management"

export default function AdminWithdrawalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Withdrawal Requests</h1>
        <p className="text-muted-foreground">Manage and process user withdrawal requests.</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <AdminWithdrawalManagement filterStatus="pending" />
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <AdminWithdrawalManagement filterStatus="approved" />
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <AdminWithdrawalManagement filterStatus="rejected" />
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <AdminWithdrawalManagement filterStatus={null} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
