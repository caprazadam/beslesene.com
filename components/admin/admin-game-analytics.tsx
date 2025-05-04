"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Download } from "lucide-react"

export function AdminGameAnalytics() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sample data for game analytics
  const activityDistributionData = [
    { name: "Feeding Chickens", value: 35 },
    { name: "Collecting Eggs", value: 30 },
    { name: "Upgrading Coops", value: 15 },
    { name: "Market Trading", value: 10 },
    { name: "Other Activities", value: 10 },
  ]

  const eggProductionData = [
    { day: "Mon", eggs: 12500 },
    { day: "Tue", eggs: 13200 },
    { day: "Wed", eggs: 12800 },
    { day: "Thu", eggs: 13500 },
    { day: "Fri", eggs: 14200 },
    { day: "Sat", eggs: 15000 },
    { day: "Sun", eggs: 14500 },
  ]

  const upgradeDistributionData = [
    { name: "Coop Capacity", value: 25 },
    { name: "Coop Comfort", value: 20 },
    { name: "Auto-Feeding", value: 15 },
    { name: "Auto-Collection", value: 15 },
    { name: "Feed Storage", value: 10 },
    { name: "Egg Storage", value: 10 },
    { name: "Other Upgrades", value: 5 },
  ]

  const chickenTypeData = [
    { name: "Manisa", value: 40 },
    { name: "Anadolu", value: 30 },
    { name: "Beyaz", value: 20 },
    { name: "Denizli", value: 10 },
  ]

  const gameMetricsData = [
    { subject: "User Engagement", A: 120, fullMark: 150 },
    { subject: "Retention", A: 98, fullMark: 150 },
    { subject: "Monetization", A: 86, fullMark: 150 },
    { subject: "Virality", A: 99, fullMark: 150 },
    { subject: "User Satisfaction", A: 85, fullMark: 150 },
    { subject: "Game Balance", A: 65, fullMark: 150 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"]

  if (!isMounted) {
    return <div className="h-[400px] flex items-center justify-center">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Game Analytics</h2>
          <p className="text-muted-foreground">Analyze in-game activities and player behavior.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Percentage of time spent on different activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {activityDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Egg Production</CardTitle>
            <CardDescription>Total eggs produced by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eggProductionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="eggs" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade Distribution</CardTitle>
            <CardDescription>Most popular upgrades by percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={upgradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {upgradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chicken Type Distribution</CardTitle>
            <CardDescription>Most popular chicken types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chickenTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chickenTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Game Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for game health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={gameMetricsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar
                    name="Game Metrics"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary)/0.2)"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
