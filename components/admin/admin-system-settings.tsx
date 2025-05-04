"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function AdminSystemSettings() {
  const { toast } = useToast()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleSaveSettings = () => {
    // Here you would implement the actual save logic
    setShowSuccessAlert(true)

    // Show toast notification
    toast({
      title: "Settings saved",
      description: "System settings have been updated successfully.",
    })

    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {showSuccessAlert && (
        <Alert
          variant="default"
          className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
        >
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>System settings have been updated successfully.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Site Information</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="Beslesene.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input id="site-description" defaultValue="Virtual chicken farm game" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="site-announcement">Site Announcement</Label>
                    <Textarea
                      id="site-announcement"
                      placeholder="Enter an announcement to display to all users"
                      defaultValue="Welcome to the new version of Beslesene.com! Check out our new features."
                    />
                    <p className="text-sm text-muted-foreground">
                      This message will be displayed to all users on the homepage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="tr">Turkish</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="default-timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        <SelectItem value="ist">Istanbul Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Features</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-registration" defaultChecked />
                    <Label htmlFor="enable-registration">Enable User Registration</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-premium" defaultChecked />
                    <Label htmlFor="enable-premium">Enable Premium Subscriptions</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-withdrawals" defaultChecked />
                    <Label htmlFor="enable-withdrawals">Enable Withdrawals</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="enable-referrals" defaultChecked />
                    <Label htmlFor="enable-referrals">Enable Referral Program</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options and access controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-2fa" defaultChecked />
                    <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="require-email-verification" defaultChecked />
                    <Label htmlFor="require-email-verification">Require Email Verification</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-min-length">Minimum Password Length</Label>
                    <Input id="password-min-length" type="number" defaultValue="8" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rate Limiting</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">Max Login Attempts</Label>
                    <Input id="login-attempts" type="number" defaultValue="5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                    <Input id="lockout-duration" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Security</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-api" defaultChecked />
                    <Label htmlFor="enable-api">Enable API Access</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="require-api-key" defaultChecked />
                    <Label htmlFor="require-api-key">Require API Key</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                  <Input id="api-rate-limit" type="number" defaultValue="100" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-new-users" defaultChecked />
                    <Label htmlFor="notify-new-users">Notify on New User Registration</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notify-withdrawals" defaultChecked />
                    <Label htmlFor="notify-withdrawals">Notify on Withdrawal Requests</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notify-premium" defaultChecked />
                    <Label htmlFor="notify-premium">Notify on Premium Subscriptions</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="admin-emails">Admin Email Recipients</Label>
                    <Input id="admin-emails" defaultValue="admin@beslesene.com, support@beslesene.com" />
                    <p className="text-sm text-muted-foreground">
                      Comma-separated list of email addresses to receive admin notifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Notifications</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="user-welcome-email" defaultChecked />
                    <Label htmlFor="user-welcome-email">Send Welcome Email</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="user-withdrawal-email" defaultChecked />
                    <Label htmlFor="user-withdrawal-email">Send Withdrawal Status Emails</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="user-inactivity-email" defaultChecked />
                    <Label htmlFor="user-inactivity-email">Send Inactivity Reminder Emails</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inactivity-days">Inactivity Reminder Days</Label>
                  <Input id="inactivity-days" type="number" defaultValue="7" />
                  <p className="text-sm text-muted-foreground">
                    Number of days of inactivity before sending a reminder email.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Settings</CardTitle>
              <CardDescription>Configure system maintenance and backup options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maintenance Mode</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-maintenance" />
                    <Label htmlFor="enable-maintenance">Enable Maintenance Mode</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      placeholder="Enter a message to display during maintenance"
                      defaultValue="We're currently performing scheduled maintenance. Please check back soon!"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Backups</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-auto-backup" defaultChecked />
                    <Label htmlFor="enable-auto-backup">Enable Automatic Backups</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input id="backup-retention" type="number" defaultValue="30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-location">Backup Storage Location</Label>
                  <Input id="backup-location" defaultValue="s3://beslesene-backups/" />
                  <p className="text-sm text-muted-foreground">Path or URL where backups should be stored.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Database Maintenance</h3>
                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-auto-cleanup" defaultChecked />
                    <Label htmlFor="enable-auto-cleanup">Enable Automatic Data Cleanup</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="90" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inactive-user-retention">Inactive User Retention (days)</Label>
                    <Input id="inactive-user-retention" type="number" defaultValue="365" />
                    <p className="text-sm text-muted-foreground">Days before inactive users are archived.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
