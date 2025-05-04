import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAnnouncementManagement } from "@/components/admin/admin-announcement-management"

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Manage announcements, news, and other content.</p>
      </div>

      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="help">Help Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements" className="space-y-4">
          <AdminAnnouncementManagement />
        </TabsContent>
        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>News Management</CardTitle>
              <CardDescription>Manage news articles and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">News management functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Help Articles</CardTitle>
              <CardDescription>Manage help and support articles.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Help article management functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
