import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminGameSettings } from "@/components/admin/admin-game-settings"
import { AdminSystemSettings } from "@/components/admin/admin-system-settings"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage game and system settings.</p>
      </div>

      <Tabs defaultValue="game" className="space-y-4">
        <TabsList>
          <TabsTrigger value="game">Game Settings</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="game" className="space-y-4">
          <AdminGameSettings />
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <AdminSystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
