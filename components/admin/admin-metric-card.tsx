import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface AdminMetricCardProps {
  title: string
  value: string
  description: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  trendColor?: string
}

export function AdminMetricCard({ title, value, description, trend, icon, trendColor }: AdminMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUp className={`h-3 w-3 mr-1 ${trendColor || "text-green-500"}`} />
          ) : trend === "down" ? (
            <ArrowDown className={`h-3 w-3 mr-1 ${trendColor || "text-red-500"}`} />
          ) : null}
          <span className={trendColor || (trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "")}>
            {description}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
